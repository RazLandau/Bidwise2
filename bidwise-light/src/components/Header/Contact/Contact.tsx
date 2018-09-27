import * as React from 'react';
import { Email } from 'wix-style-react/new-icons';
import Modal from 'wix-style-react/Modal';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Input from 'wix-style-react/Input';
import InputArea from 'wix-style-react/InputArea';
import Button from 'wix-style-react/Button';

export interface ContactProps {
  onCancel: Function;
}

export interface ContactState {
  name?: string;
  email?: string;
  subject?: string;
  details? : string;
  sent?: boolean;
}

class Contact extends React.Component<ContactProps, ContactState> {
  readonly state: ContactState = {};

  render() {
    const { onCancel } = this.props;
    const { sent, name, email, subject, details } = this.state;
    return (
      <Modal
        contentLabel="contact-modal"
        isOpen
      >
        <div dir="rtl" className="rtl">
          <MessageBoxFunctionalLayout
            theme="blue"
            title={<div style={{ display: 'flex', alignItems: 'center' }}><Email size="32px" style={{ marginLeft: '5px' }} />יצירת קשר</div>}
            onCancel={onCancel}
            hideFooter
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ width: '265px' }}>
                  <Input
                    placeholder="שם מלא"
                    onChange={event => this.setState({ name: event.target.value })}
                    status={sent && !name ? 'error' : undefined}
                  />
                </div>
                <div style={{ width: '265px' }}>
                  <Input
                    placeholder="כתובת דוא״ל"
                    onChange={event => this.setState({ email: event.target.value })}
                    status={sent && !email ? 'error' : undefined}
                  />
                </div>
              </div>
              <Input
                placeholder="נושא"
                onChange={event => this.setState({ subject: event.target.value })}
                status={sent && !subject ? 'error' : undefined}
              />
              <div style={{ margin: '5px 0 20px 0' }}>
                <InputArea
                  placeholder="פירוט"
                  onChange={event => this.setState({ details: event.target.value })}
                  error={sent && !details}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => this.setState({ sent: true })}>שליחה</Button>
              </div>
          </MessageBoxFunctionalLayout>
        </div>
      </Modal>
    );
  }
}

export default Contact;
