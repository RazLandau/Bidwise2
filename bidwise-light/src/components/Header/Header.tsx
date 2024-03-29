import * as React from 'react';
import { User, HelpCircle, Email, Facebook } from 'wix-style-react/new-icons';
import TextLink from 'wix-style-react/TextLink';
import Text from 'wix-style-react/Text';
import Tooltip from 'wix-style-react/Tooltip';
import Contact from './Contact/Contact';
import Info from './Info/Info';
import Login from './Login/Login';
import StatsWidget from 'wix-style-react/StatsWidget';

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
          <div style={{ marginRight: '20px', display: 'flex'}}>
            {this.renderBidwiseLogo()}
            {this.renderAgudaLogo()}
          </div>
          <div>
            {/*{this.renderStats()}*/}
          {/*</div>*/}
          <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
            {this.renderActions()}
            {/*{this.renderAgudaLogo()}*/}
          </div>
        </div>
      </div>
    );
  }

  renderModals() {
    const { isContactModalOpen, isInfoModalOpen, isLoginModalOpen } = this.state;
    return (
      <div>
        {isLoginModalOpen ? <Login onCancel={() => this.setState({ isLoginModalOpen: false })}/> : undefined}
        {isInfoModalOpen ? <Info onCancel={() => this.setState({ isInfoModalOpen: false })}/> : undefined}
        {isContactModalOpen ? <Contact onCancel={() => this.setState({ isContactModalOpen: false })}/> : undefined}
      </div>
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

  renderStats() {
    const { stats } = this.props;
    return (
      <Text>
        {`סה״כ באתר: \
        ${stats.faculties} \
        פקולטות, \
        ${stats.schools} \
        חוגים, \
        ${stats.courses} \
        קורסים, \
        ${stats.comments} \
        תגובות`}
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
          >
              התחברות
          </TextLink>
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
            prefixIcon={<HelpCircle/>}
            onClick={() => this.setState({ isInfoModalOpen: true })}
          >
              עזרה
          </TextLink>
        </Tooltip>
        {/* <Tooltip
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
        </Tooltip> */}
        {/*<Tooltip*/}
          {/*content="!עשו לנו לייק"*/}
          {/*shouldCloseOnClickOutside*/}
          {/*theme="dark"*/}
          {/*placement="bottom"*/}
        {/*>*/}
          {/*<TextLink*/}
            {/*underlineStyle="never"*/}
            {/*theme="greyScale"*/}
            {/*prefixIcon={<Facebook style={{ transform: 'translate(6px, -1px)'}} />}*/}
            {/*link="https://www.facebook.com/bidwise-164753391101837/"*/}
          {/*/>*/}
        {/*</Tooltip>*/}
      </div>
    );
  }

  renderAgudaLogo() {
    return (
      <a href="http://student.co.il/">
        <img height="40px" src="https://www.student.co.il/uploads/crop/kgHBtqtIeSh0y9d9MG4yoV5zI9vfnxsvIxpmouog_logo_image_desktop_general.png" />
      </a>
    );
  }
}

export default Header;
