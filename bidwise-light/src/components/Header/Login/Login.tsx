import * as React from 'react';
import { User } from 'wix-style-react/new-icons';
import Modal from 'wix-style-react/Modal';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import EmptyState from 'wix-style-react/EmptyState';

export interface LoginProps {
  onCancel: Function;
}

class Login extends React.Component<LoginProps> {
  render() {
    const { onCancel } = this.props;
    return (
      <Modal
        contentLabel="login-modal"
        isOpen
      >
        <div dir="rtl">
          <MessageBoxFunctionalLayout
            theme="blue"
            title={<div style={{ display: 'flex', alignItems: 'center' }}><User size="32px" style={{ marginLeft: '5px' }} />התחברות</div>}
            onCancel={onCancel}
            hideFooter
            >
            <EmptyState
              image={<span style={{ alignSelf: 'center', fontSize: "150px" }}>🤦‍</span>}
              theme="section"
              title="אופס.."
              subtitle="עובדים על זה!"
            />
          </MessageBoxFunctionalLayout>
        </div>
      </Modal>
    );
  }
}

export default Login;
