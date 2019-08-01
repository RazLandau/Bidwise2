import * as React from 'react';
import { InfoCircle } from 'wix-style-react/new-icons';
import Modal from 'wix-style-react/Modal';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';

export interface InfoProps {
  onCancel: Function;
}

class Info extends React.Component<InfoProps> {
  render() {
    const { onCancel } = this.props;
    return (
      <Modal
        contentLabel="info-modal"
        isOpen
        shouldCloseOnOverlayClick
        onRequestClose={onCancel}
      >
        <div dir="rtl">
          <MessageBoxFunctionalLayout
            theme="blue"
            title={<div style={{ display: 'flex', alignItems: 'center' }}><InfoCircle size="32px" style={{ marginLeft: '5px' }} />מידע</div>}
            onCancel={onCancel}
            hideFooter
            >
            <div style={{ height: '500px', overflowY: 'scroll', direction: 'ltr' }}>
              <div style={{ direction: 'rtl', paddingRight: '15px' }}>
                <p>
                  bidwise הוקם (בתקווה) כחלק מפרויקט גמר בסדנת מיקור המונים במדעי המחשב באוניברסיטת תל אביב.
                  האתר הוא כלי עזר לבחירת קורסים באוניברסיטת ת"א, המאפשר גישה נוחה לתגובות וביקורות של סטודנטים על קורסים שונים מכל החוגים והפקולטות באוניברסיטה.
                </p>
                <p>
                  השימוש באתר פשוט: לחיצה על שורת הקורס בטבלה תציג את טבלת התגובות עליו ולחיצה על כל תגובה תציג את פירוטה המלא.
                  ניתן לחפש ולמיין את הקורסים והתגובות ע״פ קריטריונים שונים, והכי חשוב- להוסיף תגובה חדשה על קורס קיים/חדש.
                </p>
                <p>
                כמובן שאין המפתחים לוקחים אחריות על המידע או על כל נזק שיגרם משימוש במידע או משימוש בשירותי האתר,
                השימוש בתוכנה על אחריות המשתמש בלבד,
                אגודת הסטודנטים של אוניברסיטת תל אביב ו/או מי מטעמה אינם נושאים באחריות כלשהי לתוכנה ו/או השימוש בה,
                אינם אחראים לכל אבדן או נזק ישיר או עקיף שעלולים להיגרם כתוצאה מכך
                ואינם ולא יהיו צד להתקשרות ולא יישאו בכל אחריות שהיא
                ועוד כל מיני בלה-בלה משפטי..
                </p>
                <p>
                  תודה על שיתוף הפעולה ובהצלחה בהמשך הלימודים!
                </p>
                <p style={{ textAlign: 'left' }}>
                  צוות bidwise
                </p>
                <p>
                  * האתר התאמץ מאד לא להיות מנוסח בלשון זכר, אם התפלק לנו בטעות או במקרה של כל תקלה/שאלה אחרת אל {<a href="http://hebrew-academy.org.il/2010/03/25/%D7%94%D7%9F-%D7%99%D6%B4%D7%94%D6%B0%D7%99%D7%95%D6%BC-%D7%90%D7%95-%D7%94%D7%9F-%D7%AA%D6%B4%D6%BC%D7%94%D6%B0%D7%99%D6%B6%D7%99%D7%A0%D6%B8%D7%94-%D7%A0%D7%95%D7%9B%D7%97%D7%95%D7%AA/">תהססו</a>} ליצור קשר דרך הפייסבוק.
                </p>
                <p style={{ textAlign: 'center', paddingTop: '2000px' }}>
                  הגעת עד לפה?? הנה ביצת פסחא על המאמץP:
                </p>
              </div>
            </div>
          </MessageBoxFunctionalLayout>
        </div>
      </Modal>
    );
  }
}

export default Info;
