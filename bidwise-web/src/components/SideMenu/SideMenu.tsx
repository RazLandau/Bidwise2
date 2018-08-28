import * as React from 'react';
import SideMenu from 'wix-style-react/SideMenu';
import * as styles from './SideMenu.scss';
import { FacultiesServerApi } from '../../services/faculties-server-api';
import Modal from 'wix-style-react/Modal';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';

export interface SideMenuProps {}

export interface SideMenuState {
  loaded: boolean;
  faculties: { name: string }[];
  isHelpModalOpen: boolean;
  isAboutModalOpen: boolean;
  isContactUsModalOpen: boolean;
}

class sideMenu extends React.Component<SideMenuProps> {
  readonly state: SideMenuState = {
    loaded: false,
    faculties: [],
    isHelpModalOpen: false,
    isAboutModalOpen: false,
    isContactUsModalOpen: false,
  };
  facultiesServerApi = new FacultiesServerApi();

  async componentDidMount() {
    const faculties = (await this.facultiesServerApi.getFaculties()).faculties;
    this.setState({ loaded: true, faculties });
  }

  render(): JSX.Element {
    return (
      <div data-hook="side-menu" className={styles.menu}>
        {this.renderModals()}
        <SideMenu>
          <SideMenu.Navigation>
            {this.renderDynamicNavigation()}
            <SideMenu.NavigationSeparator />
            {this.renderStaticNavigation()}
          </SideMenu.Navigation>
          <SideMenu.Footer>{this.renderFooter()}</SideMenu.Footer>
        </SideMenu>
      </div>
    );
  }

  renderModals(): JSX.Element {
    return (
      <div>
        {this.renderHelpModal()}
        {this.renderAboutModal()}
        {this.renderContactUsModal()}
      </div>
    );
  }

  renderHelpModal(): JSX.Element {
    return (
      <Modal
        isOpen={this.state.isHelpModalOpen}
        onRequestClose={(): void => this.setState({ isHelpModalOpen: false })}
        contentLabel="עזרה"
      >
        <div style={{ direction: 'rtl' }}>
          <MessageBoxFunctionalLayout
            dataHook="help-modal"
            onCancel={(): void => this.setState({ isHelpModalOpen: false })}
            theme="blue"
            title="עזרה"
            hideFooter
            withEmptyState
          />
        </div>
      </Modal>
    );
  }

  renderAboutModal(): JSX.Element {
    return (
      <Modal
        contentLabel="אודות"
        isOpen={this.state.isAboutModalOpen}
        onRequestClose={(): void => this.setState({ isAboutModalOpen: false })}
      >
        <div style={{ direction: 'rtl' }}>
          <MessageBoxFunctionalLayout
            dataHook="about-modal"
            onCancel={(): void => this.setState({ isAboutModalOpen: false })}
            theme="blue"
            title="אודות"
            hideFooter
            withEmptyState
          />
        </div>
      </Modal>
    );
  }

  renderContactUsModal(): JSX.Element {
    return (
      <Modal
        contentLabel="ליצירת קשר"
        isOpen={this.state.isContactUsModalOpen}
        onRequestClose={(): void =>
          this.setState({ isContactUsModalOpen: false })
        }
      >
        <div style={{ direction: 'rtl' }}>
          <MessageBoxFunctionalLayout
            dataHook="contact-us-modal"
            onCancel={(): void =>
              this.setState({ isContactUsModalOpen: false })
            }
            theme="blue"
            title="ליצירת קשר"
            hideFooter
            withEmptyState
          />
        </div>
      </Modal>
    );
  }

  renderDynamicNavigation(): JSX.Element {
    const { loaded, faculties } = this.state;
    return loaded && faculties ? (
      <div>
        {faculties.map(
          (faculty: { name: string }): JSX.Element => (
            <SideMenu.NavigationLink data-hook="faculty">
              {faculty.name}
            </SideMenu.NavigationLink>
          ),
        )}
      </div>
    ) : (
      <div data-hook="is-loading" />
    );
  }

  renderStaticNavigation(): JSX.Element {
    return (
      <div>
        <SideMenu.NavigationLink
          isDiminishedHover
          onClick={(): void => this.setState({ isHelpModalOpen: true })}
          data-hook="help-link"
        >
          עזרה
        </SideMenu.NavigationLink>
        <SideMenu.NavigationLink
          data-hook="about-link"
          isDiminishedHover
          onClick={(): void => this.setState({ isAboutModalOpen: true })}
        >
          אודות
        </SideMenu.NavigationLink>
        <SideMenu.NavigationLink
          onClick={(): void => this.setState({ isContactUsModalOpen: true })}
          isDiminishedHover
          data-hook="contact-us-link"
        >
          ליצירת קשר
        </SideMenu.NavigationLink>
        <SideMenu.NavigationLink data-hook="yedion-link" isDiminishedHover>
          ידיעון האוניברסיטה
        </SideMenu.NavigationLink>
      </div>
    );
  }

  renderFooter(): JSX.Element {
    return (
      <SideMenu.FooterLink data-hook="copyrights">
        © כל הזכויות שמורות
      </SideMenu.FooterLink>
    );
  }
}

export default sideMenu;
