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
import { Chat } from 'wix-style-react/new-icons';
import { updateIsAddModalOpen } from '../../actions';

export interface AddCommentProps {
  isAddModalOpen: boolean;
  closeAddModal: Function;
}

class AddComment extends React.Component<AddCommentProps> {
  render() {
    const { isAddModalOpen, closeAddModal } = this.props;
    return (
      <Modal
        contentLabel="info-modal"
        isOpen={isAddModalOpen}
        scrollableContent={false}
        onRequestClose={closeAddModal}
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
              {this.renderQuote()}
              {this.renderSendButton()}
          </MessageBoxFunctionalLayout>
        </div>
      </Modal>
    );
  }

  renderMetaData() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '265px' }}>
            <Input placeholder="שם הפקולטה" />
          </div>
          <div style={{ width: '265px' }}>
          <Input placeholder="שם החוג" />
          </div>
        </div>
        <div style={{ margin: '5px 0' }}>
          <Input placeholder="שם הקורס" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '430px' }}>
            <Input placeholder="שם המרצה" />
          </div>
          <div style={{ width: '100px' }}>
            <Dropdown placeholder="סמסטר" />
          </div>
        </div>
      </div>
    );
  }

  renderRatings() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 5px 0' }}>
        {this.renderEasy()}
        {this.renderInteresting()}
        {this.renderRecommended()}
      </div>
    );
  }

  renderEasy() {
    const rating = [];
    for (let i = 0; i < 5; i++) {
      rating.push(
        <Heading
          key={i}
          style={{ opacity: 0.1 }}
          appearance="H2"
        >
          💯
        </Heading>,
      );
    }
    return <div style={{ display: 'flex' }}>{rating}</div>;
  }

  renderInteresting() {
    const rating = [];
    for (let i = 0; i < 5; i++) {
      rating.push(
        <Heading
          key={i}
          style={{ opacity: 0.1 }}
          appearance="H2"
        >
          🧠
        </Heading>,
      );
    }
    return <div style={{ display: 'flex' }}>{rating}</div>;
  }

  renderRecommended() {
    const rating = [];
    for (let i = 0; i < 5; i++) {
      rating.push(
        <Heading
          key={i}
          style={{ opacity: 0.1 }}
          appearance="H2"
        >
          👍
        </Heading>,
      );
    }
    return <div style={{ display: 'flex' }}>{rating}</div>;
  }

  renderComment() {
    return (
      <div>
        <Input
          placeholder="אמ;לק"
        />
        <div style={{ margin: '5px 0' }}>
          <InputArea
            placeholder="פירוט"
          />
        </div>
      </div>

    );
  }

  renderQuote() {
    const quote = this.getRandomQuote();
    return (
      <div style={{ padding: '0 70px', textAlign: 'center' }}>
        <Text>
          {quote.quote}
          <br />
          {quote.quotee}
        </Text>
      </div>
    );
  }

  getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  renderSendButton() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button>שליחה</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAddModalOpen: state.isAddModalOpen,
})

const mapDispatchToProps = dispatch => ({
  closeAddModal: () => dispatch(updateIsAddModalOpen(false)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);

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
