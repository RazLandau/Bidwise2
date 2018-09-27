import * as React from 'react';
import { connect } from 'react-redux';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Input from 'wix-style-react/Input';
import Modal from 'wix-style-react/Modal';
import Dropdown from 'wix-style-react/Dropdown';
import InputArea from 'wix-style-react/InputArea';
import Button from 'wix-style-react/Button';
import Text from 'wix-style-react/Text';
import Heading from 'wix-style-react/Heading';
import { Chat, StatusAlertFilled } from 'wix-style-react/new-icons';
import { updateIsAddModalOpen } from '../../actions';

export interface AddCommentProps {
  isAddModalOpen: boolean;
  closeAddModal: Function;
}

export interface AddCommentState {
  easy?: number;
  interesting?: number;
  recommended?: number;
  sent?: boolean;
  faculty?: string;
  school?: string;
  course? : string;
  lecturer?: string;
  tldr?: string;
  details? : string;
  quote?: { quote: string, quotee: string };
}

class AddComment extends React.Component<AddCommentProps, AddCommentState> {
  readonly state: AddCommentState = {};

  componentDidMount() {
    const quote = this.getRandomQuote();
    this.setState({ quote })
  }

  render() {
    const { closeAddModal } = this.props;
    return (
      <Modal
        contentLabel="info-modal"
        isOpen
        scrollableContent={false}
      >
        <div dir="rtl" className="rtl">
          <MessageBoxFunctionalLayout
            theme="blue"
            title={<div style={{ display: 'flex', alignItems: 'center' }}><Chat size="32px" style={{ marginLeft: '5px' }} />תגובה חדשה</div>}
            onCancel={closeAddModal}
            hideFooter
            >
              {this.renderMetaData()}
              {this.renderRatings()}
              {this.renderComment()}
              {/* {this.renderQuote()} */}
              {this.renderSendButton()}
          </MessageBoxFunctionalLayout>
        </div>
      </Modal>
    );
  }

  renderMetaData() {
    const { sent, faculty, school, course, lecturer } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '265px' }}>
            <Input
              placeholder="שם הפקולטה"
              onChange={event => this.setState({ faculty: event.target.value })}
              status={sent && !faculty ? 'error' : undefined}
            />
          </div>
          <div style={{ width: '265px' }}>
          <Input
            placeholder="שם החוג"
            onChange={event => this.setState({ school: event.target.value })}
            status={sent && !school ? 'error' : undefined}
          />
          </div>
        </div>
        <div style={{ margin: '5px 0' }}>
          <Input
            placeholder="שם הקורס"
            onChange={event => this.setState({ course: event.target.value })}
            status={sent && !course ? 'error' : undefined}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '430px' }}>
            <Input
              placeholder="שם המרצה"
              onChange={event => this.setState({ lecturer: event.target.value })}
              status={sent && !lecturer ? 'error' : undefined}
            />
          </div>
          <div style={{ width: '100px' }}>
            <Dropdown placeholder="סמסטר" options={[{id: 0, value: "2019א"}]} selectedId={0} />
          </div>
        </div>
      </div>
    );
  }

  renderRatings() {
    const { sent, easy, interesting, recommended } = this.state;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 5px 0' }}>
        {this.renderEasy()}
        <StatusAlertFilled size="28px" style={{ color: '#EE5951', opacity: sent && (!easy || !interesting) ? '1' : 0 }} />
        {this.renderInteresting()}
        <StatusAlertFilled size="28px" style={{ color: '#EE5951', opacity: sent && (!interesting || !recommended) ? '1' : 0 }} />
        {this.renderRecommended()}
      </div>
    );
  }

  renderEasy() {
    const { easy = 0 } = this.state;
    const rating = [];
    for (let i = 0; i < easy; i++) {
      rating.push(
        <Heading
          key={i}
          appearance="H2"
          onClick={() => this.setState({ easy: i + 1 })}
        >
          💯
        </Heading>,
      );
    }
    for (let i = easy; i < 5; i++) {
      rating.push(
        <Heading
          key={i}
          style={{ opacity: 0.1 }}
          appearance="H2"
          onClick={() => this.setState({ easy: i + 1 })}
        >
          💯
        </Heading>,
      );
    }
    return <div style={{ display: 'flex', cursor: 'pointer' }}>{rating}</div>;
  }

  renderInteresting() {
    const { interesting = 0 } = this.state;
    const rating = [];
    for (let i = 0; i < interesting; i++) {
      rating.push(
        <Heading
          key={i}
          appearance="H2"
          onClick={() => this.setState({ interesting: i + 1 })}
        >
          🧠
        </Heading>,
      );
    }
    for (let i = interesting; i < 5; i++) {
      rating.push(
        <Heading
          key={i}
          style={{ opacity: 0.1 }}
          appearance="H2"
          onClick={() => this.setState({ interesting: i + 1 })}
        >
          🧠
        </Heading>,
      );
    }
    return <div style={{ display: 'flex', cursor: 'pointer' }}>{rating}</div>;
  }

  renderRecommended() {
    const { recommended = 0 } = this.state;
    const rating = [];
    for (let i = 0; i < recommended; i++) {
      rating.push(
        <Heading
          key={i}
          appearance="H2"
          onClick={() => this.setState({ recommended: i + 1 })}
        >
          👍
        </Heading>,
      );
    }
    for (let i = recommended; i < 5; i++) {
      rating.push(
        <Heading
          key={i}
          style={{ opacity: 0.1 }}
          appearance="H2"
          onClick={() => this.setState({ recommended: i + 1 })}
        >
          👍
        </Heading>,
      );
    }
    return <div style={{ display: 'flex', cursor: 'pointer' }}>{rating}</div>;
  }

  renderComment() {
    const { sent , tldr, details } = this.state;
    return (
      <div>
        <Input
          placeholder="אמ;לק"
          onChange={event => this.setState({ tldr: event.target.value })}
          status={sent && !tldr ? 'error' : undefined}
        />
        <div style={{ margin: '5px 0' }}>
          <InputArea
            placeholder="פירוט"
            onChange={event => this.setState({ details: event.target.value })}
            error={sent && !details}
          />
        </div>
      </div>

    );
  }

  renderQuote() {
    const { quote } = this.state;
    return (
      quote ? <div style={{ padding: '0 70px', textAlign: 'center' }}>
        <Text>
          {quote.quote}
          <br />
          {quote.quotee}
        </Text>
      </div> : undefined
    );
  }

  getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  renderSendButton() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button onClick={() => this.setState({ sent: true })}>שליחה</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeAddModal: () => dispatch(updateIsAddModalOpen(false)),
})

export default connect(null, mapDispatchToProps)(AddComment);

const quotes = [
  {
    quote: 'ביקורת, כמו גשם, צריכה להיות עדינה מספיק כדי להזין את צמיחתו של האדם מבלי להרוס את שורשיו.',
    quotee: 'פרנק קלארק',
  },
  {
    quote: 'כולנו זקוקים לאנשים שייתנו לנו משוב. ככה אנחנו משתפרים.',
    quotee: 'ביל גייטס',
  },
  {
    quote: 'משוב הוא ארוחת הבוקר של אלופים.',
    quotee: 'קן בלנצ׳רד',
  },
  {
    quote: 'משוב הוא מתנה.',
    quotee: 'ג׳ים טרינקה ולס וואלס',
  },
  {
    quote: 'אין כישלון. רק משוב.',
    quotee: 'רוברט אלן',
  },
  {
    quote: 'עבורי, הדבר הבסיסי ביותר במנהיגות הוא הענווה להמשיך לקבל משוב ולנסות להשתפר - כי התפקיד שלך הוא לנסות לעזור לכל אחד אחר להשתפר.',
    quotee: 'ג׳ים יונג קים',
  },
  {
    quote: 'מומחיות אינטואיטיבית אמיתית נלמדת מניסיון ממושך עם משוב טוב על טעויות.',
    quotee: 'דניאל כהנמן',
  },
  {
    quote: 'ביקורת יכולה להיות לא נעימה, אבל היא הכרחית. היא ממלאת את אותה פונקציה כמו כאב בגוף האדם. היא דורשת תשומת לב למצב לא בריא של דברים.',
    quotee: 'וינסטון צ׳רצ׳יל',
  },
  {
    quote: 'כדי להימנע מביקורת, עשה שום דבר, אמור שום דבר, היה שום דבר.',
    quotee: 'אלברט הובארד',
  },
  {
    quote: 'למילים יש אנרגיה ועוצמה עם היכולת לעזור, לרפא, לעכב, לפגוע, לפגוע, להשפיל ולהצניע.',
    quotee: 'יהודה ברג',
  },
  {
    quote: 'כדי לתקשר בצורה יעילה, עלינו להבין כי כולנו שונים באופן שבו אנו תופסים את העולם ולהשתמש בהבנה זו כמדריך לתקשורת שלנו עם אחרים.',
    quotee: 'טוני רובינס',
  },
  {
    quote: 'כל המילים שאנו הוגים צריכים להיבחר בקפידה עבור אנשים שישמעו אותם ויושפעו מהם לטוב או לרע.',
    quotee: 'בודהה',
  },
  {
    quote: 'אם יש לך נקודה חשובה להעביר, אל תנסה להיות עדין או חכם. השתמש במכבש. הכה את הנקודה פעם אחת. ואז חזור להכות אותה שוב. ואז הכה אותה בפעם השלישית - חבטה אדירה.',
    quotee: 'וינסטון צ׳רצ׳יל',
  },
  {
    quote: 'אני מאמין גדול כי לכל כלי המשפר את התקשורת יש השפעות עמוקות במונחים של איך אנשים יכולים ללמוד אחד מהשני, וכיצד הם יכולים להשיג את סוגי החירויות שהם מעוניינים.',
    quotee: 'ביל גייטס',
  },
  {
    quote: 'אם המעשים שלך עודדו אחרים לחלום יותר, ללמוד יותר, לעשות יותר ולהיות יותר, אתה מנהיג.',
    quotee: 'ג׳ון קווינסי אדמס',
  },
  {
    quote: 'שיפור ההבנה הוא לשני קצוות: ראשית, הגדלת הידע שלנו; שנית, לאפשר לנו להעביר את הידע הזה לאחרים.',
    quotee: 'ג׳ון לוק',
  },
  {
    quote: 'אם יש לך ידע, תן לאחרים להדליק את הנרות שלהם בתוכו.',
    quotee: 'מרגרט פולר',
  },
  {
    quote: 'אין ספק כי כל הידע שלנו מתחיל עם ניסיון.',
    quotee: 'עמנואל קאנט',
  },
  {
    quote: 'הידע אינו נשען על האמת בלבד, אלא גם על השגיאה.',
    quotee: 'קרל יונג',
  },
]
