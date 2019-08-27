import React from 'react';

import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import TextLink from 'wix-style-react/TextLink';
import EmptyState from 'wix-style-react/EmptyState';
import { Add } from 'wix-style-react/new-icons';
import Box from 'wix-style-react/Box';
import { InfoCircle } from 'wix-style-react/new-icons';
import Modal from 'wix-style-react/Modal';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';

class Header extends React.Component {
    state = {
        isLoginModalOpen: false
    };

    render() {
        return (
            <div>
                {this.renderModals()}
                <Box
                    align="space-between"
                    // backgroundColor="B50"
                    // color="P00"
                    minHeight={200}
                    padding={1}
                    verticalAlign="middle"
                >
                    {this.renderActions()}
                    {this.renderBidwiseLogo()}
                </Box>
                <div
                    className="rtl"
                    dir="rtl"
                    style={{
                        boxShadow: '0 -1px 0 0px rgba(41,85,115,.21)',
                        display: 'flex',
                        flexFlow: 'column',
                        minWidth: '966px',
                        height: 'calc(100vh - 50px)',
                    }}
                >
                    <Page>
                        <Page.Header />
                        <Page.Content />
                    </Page>
                </div>
            </div>
        );
    }

    renderBidwiseLogo = () => (
        <div data-hook="title" style={{transform: 'translateY(-5px)', fontFamily: 'monospace', direction: 'ltr'}}>
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
            <span style={{fontSize: '25px', fontWeight: 'bold'}}>idwise</span>
        </div>
    );

    renderActions() {
        return (
            <TextLink
                underlineStyle="never"
                theme="greyScale"
                suffixIcon={<InfoCircle style={{ transform: 'translateY(1px)'}}/>}
                onClick={() => this.setState({ isInfoModalOpen: true })}
            >
                מידע
            </TextLink>
        )
    }

    renderModals() {
        const { isInfoModalOpen } = this.state;
        return (
            <div>
                {isInfoModalOpen ?

                    <Modal
                        contentLabel="info-modal"
                        isOpen
                        shouldCloseOnOverlayClick
                        onRequestClose={() => this.setState({ isInfoModalOpen: false })}
                    >
                        <div dir="rtl">
                            <MessageBoxFunctionalLayout
                                theme="blue"
                                title={<div style={{ display: 'flex', alignItems: 'center' }}><InfoCircle size="32px" style={{ marginLeft: '5px' }} />מידע</div>}
                                onCancel={() => this.setState({ isInfoModalOpen: false })}
                                hideFooter
                            >
                                <div style={{ height: '500px', overflowY: 'scroll', direction: 'ltr' }}>
                                    <div style={{ direction: 'rtl', paddingRight: '15px' }}>
                                        <p>
                                            האתר הוא כלי עזר לבחירת קורסים באוניברסיטת ת"א, המאפשר גישה נוחה לתגובות וביקורות של סטודנטים על קורסים שונים מכל החוגים והפקולטות באוניברסיטה.
                                        </p>
                                        <p>
                                            השימוש באתר פשוט: לחיצה על שורת הקורס בטבלה תציג את טבלת התגובות עליו ולחיצה על כל תגובה תציג את פירוטה המלא.
                                            ניתן לחפש ולמיין את הקורסים והתגובות ע״פ קריטריונים שונים, והכי חשוב- להוסיף תגובה חדשה על קורס קיים/חדש.
                                        </p>
                                        <p>
                                            כמובן שאין המפתחים לוקחים אחריות על המידע או על כל נזק שיגרם משימוש במידע או משימוש בשירותי האתר,
                                            השימוש בתוכנה על אחריות המשתמש בלבד
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
                    </Modal> : undefined}
            </div>
        );
    }
}

export default Header;
