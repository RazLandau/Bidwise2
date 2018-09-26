import * as React from 'react';
import { User, InfoCircle, Email, Facebook } from 'wix-style-react/new-icons';
import TextLink from 'wix-style-react/TextLink';
import Text from 'wix-style-react/Text';
import Tooltip from 'wix-style-react/Tooltip';
import Modal from 'wix-style-react/Modal';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import EmptyState from 'wix-style-react/EmptyState';
import Input from 'wix-style-react/Input';
import InputArea from 'wix-style-react/InputArea';
import Button from 'wix-style-react/Button';

export interface HeaderState {
  isLoginModalOpen: boolean;
  isInfoModalOpen: boolean;
  isContactModalOpen: boolean;
}

class Header extends React.Component {
  readonly state: HeaderState = {
    isLoginModalOpen: false,
    isInfoModalOpen: false,
    isContactModalOpen: false,
  }

  render() {
    return (
      <div>
        {this.renderModals()}
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            direction: 'rtl',
            alignItems: 'center',
            cursor: 'default',
            height: '50px',
          }}
        >
          <div style={{ marginRight: '20px'}}>
            {this.renderBidwiseLogo()}
          </div>
          <div>
            {this.renderOverview()}
          </div>
          <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
            {this.renderActions()}
            {this.renderAgudaLogo()}
          </div>
        </div>
      </div>
    );
  }

  renderModals() {
    return (
      <div>
        {this.renderLoginModal()}
        {this.renderInfoModal()}
        {this.renderContactModal()}
      </div>
    );
  }

  renderLoginModal() {
    return (
      <Modal
        contentLabel="login-modal"
        isOpen={this.state.isLoginModalOpen}
        scrollableContent={false}
        onRequestClose={() => this.setState({ isLoginModalOpen: false })}
      >
        <div dir="rtl">
          <MessageBoxFunctionalLayout
            theme="blue"
            title={<div style={{ display: 'flex', alignItems: 'center' }}><User size="32px" style={{ marginLeft: '5px' }} />התחברות</div>}
            onCancel={() => this.setState({ isLoginModalOpen: false })}
            hideFooter
            >
            {this.renderModalEmptyState()}
          </MessageBoxFunctionalLayout>
        </div>
      </Modal>
    );
  }

  renderInfoModal() {
    return (
      <Modal
        contentLabel="info-modal"
        isOpen={this.state.isInfoModalOpen}
        onRequestClose={() => this.setState({ isInfoModalOpen: false })}
      >
        <div dir="rtl">
          <MessageBoxFunctionalLayout
            theme="blue"
            title={<div style={{ display: 'flex', alignItems: 'center' }}><InfoCircle size="32px" style={{ marginLeft: '5px' }} />מידע</div>}
            onCancel={() => this.setState({ isInfoModalOpen: false })}
            hideFooter
            >
            <div style={{ height: '400px', overflowY: 'scroll', direction: 'ltr' }}>
              <div style={{ direction: 'rtl', paddingRight: '15px' }}>
                <p>
                  bidwise הוקם (בתקווה) כחלק מפרויקט גמר בסדנת מיקור המונים במדעי המחשב באוניברסיטת תל אביב.
                  האתר הוא כלי עזר לבחירת קורסים באוניברסיטת ת"א, המאפשר גישה נוחה לתגובות וביקורות של סטודנטים על קורסים שונים מכל החוגים והפקולטות באוניברסיטה.
                </p>
                <p>
                  השימוש באתר די טריוויאלי: לחיצה על שורת הקורס בטבלה תציג את כל התגובות עליו ולחיצה על כל תגובה תציג את פירוטה המלא.
                  ניתן לחפש ולמיין את הקורסים והתגובות ע״פ קריטריונים שונים, והכי חשוב- להוסיף תגובה חדשה על קורס קיים/חדש.
                  <br />
                  זה עד כדי כך פשוט :)
                </p>
                <p>
                כמובן שאין המפתחים לוקחים אחריות על המידע או על כל נזק שיגרם משימוש במידע או משימוש בשירותי האתר,
                השימוש בתוכנה על אחריות המשתמש בלבד,
                אגודת הסטודנטים של אוניברסיטת תל אביב ו/או מי מטעמה אינם נושאים באחריות כלשהי לתוכנה ו/או השימוש בה,
                אינם אחראים לכל אבדן או נזק ישיר או עקיף שעלולים להיגרם כתוצאה מכך
                ואינם ולא יהיו צד להתקשרות ולא יישאו בכל אחריות שהיא-
                ועוד כל מיני בלה-בלה משפטי.
                </p>
                <p>
                  תודה על שיתוף הפעולה ובהצלחה בהמשך הלימודים!
                </p>
                <p style={{ textAlign: 'left' }}>
                  צוות bidwise
                </p>
                <p>
                  * האתר התאמץ מאד לא להיות מנוסח בלשון זכר, אם התפלק לנו בטעות או במקרה של כל באג אחר אל {<a href="http://hebrew-academy.org.il/2010/03/25/%D7%94%D7%9F-%D7%99%D6%B4%D7%94%D6%B0%D7%99%D7%95%D6%BC-%D7%90%D7%95-%D7%94%D7%9F-%D7%AA%D6%B4%D6%BC%D7%94%D6%B0%D7%99%D6%B6%D7%99%D7%A0%D6%B8%D7%94-%D7%A0%D7%95%D7%9B%D7%97%D7%95%D7%AA/">תהססו</a>} ליצור קשר.
                </p>
                <p style={{ textAlign: 'center' }}>
                  הגעת עד לפה?? קיבלת ביצת פסחאP:
                </p>
              </div>
            </div>
          </MessageBoxFunctionalLayout>
        </div>
      </Modal>
    );
  }

  renderContactModal() {
    return (
      <Modal
        contentLabel="contact-modal"
        isOpen={this.state.isContactModalOpen}
        scrollableContent={false}
        onRequestClose={() => this.setState({ isContactModalOpen: false })}
      >
        <div dir="rtl">
          <MessageBoxFunctionalLayout
            theme="blue"
            title={<div style={{ display: 'flex', alignItems: 'center' }}><Email size="32px" style={{ marginLeft: '5px' }} />יצירת קשר</div>}
            onCancel={() => this.setState({ isContactModalOpen: false })}
            hideFooter
            >

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ width: '265px' }}>
                  <Input placeholder="שם מלא" />
                </div>
                <div style={{ width: '265px' }}>
                  <Input placeholder="כתובת דוא״ל" />
                </div>
              </div>
              <Input placeholder="נושא" />
              <div style={{ margin: '5px 0 20px 0' }}>
                <InputArea
                  placeholder="פירוט"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button>שליחה</Button>
              </div>
          </MessageBoxFunctionalLayout>
        </div>
      </Modal>
    );
  }

  renderModalEmptyState() {
    return (
      <EmptyState
        image={<span style={{ alignSelf: 'center', fontSize: "150px" }}>🤦‍</span>}
        theme="section"
        title="אופס.."
        subtitle="עובדים על זה!"
      />
    );
  }

  renderBidwiseLogo() {
    return (
      <div data-hook="title" style={{ transform: 'translateY(-5px)', fontFamily: 'monospace', direction: 'ltr' }}>
        <span
          style={{
            marginRight: '1.5px',
            fontSize: '40px',
            display: 'inline-block',
            transform: 'scaleX(-1) rotate(0.1turn) translateY(1.5px)',
          }}
        >
          &
        </span>
        <span style={{ fontSize: '25px', fontWeight: 'bold' }}>idwise</span>
      </div>
    );
  }

  renderOverview() {
    return (
      <Text>
        סה״כ באתר: 2 פקולטות, 3 חוגים, 3 קורסים, 3 סמסטרים, 3 מרצים, 6 תגובות
      </Text>
    );
  }

  renderActions() {
    return (
      <div>
        <Tooltip
          content="התחברות"
          shouldCloseOnClickOutside
          theme="dark"
          placement="bottom"
        >
          <TextLink
            underlineStyle="never"
            theme="greyScale"
            prefixIcon={<User />}
            onClick={() => this.setState({ isLoginModalOpen: true })}
          />
        </Tooltip>
        <Tooltip
          content="מידע"
          shouldCloseOnClickOutside
          theme="dark"
          placement="bottom"
        >
          <TextLink
            underlineStyle="never"
            theme="greyScale"
            prefixIcon={<InfoCircle style={{ transform: 'translateY(1px)'}}/>}
            onClick={() => this.setState({ isInfoModalOpen: true })}
          />
        </Tooltip>
        <Tooltip
          content="יצירת קשר"
          shouldCloseOnClickOutside
          theme="dark"
          placement="bottom"
        >
          <TextLink
            underlineStyle="never"
            theme="greyScale"
            prefixIcon={<Email />}
            onClick={() => this.setState({ isContactModalOpen: true })}
          />
        </Tooltip>
        <Tooltip
          content="!עשו לנו לייק"
          shouldCloseOnClickOutside
          theme="dark"
          placement="bottom"
        >
          <TextLink
            underlineStyle="never"
            theme="greyScale"
            prefixIcon={<Facebook style={{ transform: 'translate(6px, -1px)'}} />}
            link="https://www.facebook.com/"
          />
        </Tooltip>
      </div>
    );
  }

  renderAgudaLogo() {
    return (
      <a href="http://student.co.il/">
        <img height="30px" src="http://bid-it.appspot.com/assets/img/aguda-logo-trans-small-4.png" />
      </a>
    );
  }
}

export default Header;
