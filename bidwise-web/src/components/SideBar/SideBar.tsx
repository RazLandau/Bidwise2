import * as React from 'react';
import { connect } from 'react-redux';
import SideMenuDrill from 'wix-style-react/SideMenuDrill';
import SideMenu from 'wix-style-react/SideMenu';
import { FacultiesServerApi } from '../../services/faculties-server-api';
import * as styles from './SideBar.scss';
import { updateGetCoursesId } from '../../actions';

export interface SideBarProps {
  updateGetCoursesId: Function;
}

export interface SideBarState {
  loaded: boolean;
  items: Item[];
}

interface Item {
  id: string;
  type: string;
  title: string;
  isActive?: boolean;
  items?: Item[];
}

class SideBar extends React.Component<SideBarProps> {
  readonly state: SideBarState = {
    loaded: false,
    items: [],
  };

  facultiesServerApi = new FacultiesServerApi();

  async componentDidMount() {
    const faculties = (await this.facultiesServerApi.getFaculties()).faculties;
    const items = faculties.map(faculty => {
      return this.facultyToItem(faculty);
    });
    this.setState({
      loaded: true,
      items: [
        // { type: 'link', title: 'הכל', isActive: true, dataHook: 'faculty' },
        ...items,
      ],
    });
  }

  facultyToItem(faculty): Item {
    const items = faculty.schools.map(school => {
      return {
        type: 'link',
        title: school,
      };
    });
    return {
      id: faculty.id,
      type: 'menu',
      title: faculty.name,
      items: [
        // { type: 'link', title: 'הכל', dataHook: 'school' },
        ...items,
      ],
    };
  }

  render() {
    const { loaded, items } = this.state;
    return loaded ? (
      <div data-hook="side-menu" className={styles.menu}>
        <SideMenuDrill stickyFooter={this.renderFooter()}>
          {this.renderHeader()}
          <SideMenu.NavigationCategory>בחר פקולטה</SideMenu.NavigationCategory>
          {this.renderDynamicNavigation(items)}
          <SideMenu.NavigationSeparator />
          {this.renderStaticNavigation()}
        </SideMenuDrill>
      </div>
    ) : (
      <div data-hook="is-loading" />
    );
  }

  renderHeader() {
    return (
      <SideMenu.Header>
        <div
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            marginRight: '20px',
            padding: '26px 30px',
            color: 'white',
            fontFamily: 'monospace',
          }}
        >
          <div data-hook="title" style={{ direction: 'ltr' }}>
            <span
              style={{
                marginRight: '1.5px',
                fontSize: '30px',
                display: 'inline-block',
                transform: 'scaleX(-1) rotate(0.1turn) translateY(1.5px)',
              }}
            >
              &
            </span>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>idwise</span>
          </div>
          <div
            data-hook="subtitle"
            style={{ marginTop: '5px', fontSize: '13px' }}
          >
            חכמים יותר מהבידינג
          </div>
        </div>
      </SideMenu.Header>
    );
  }

  renderDynamicNavigation(items): JSX.Element {
    return (
      <div>
        {items.map(item => {
          if (item.type === 'link') {
            return this.renderLink(item);
          }

          if (item.type === 'menu') {
            return this.renderMenu(item);
          }
          return null;
        })}
      </div>
    );
  }

  renderMenu(menu: Item): JSX.Element {
    return (
      <SideMenuDrill.SubMenu
        key={menu.title}
        menuKey={menu.title}
        title={menu.title}
        backLabel="חזרה"
        linkDataHook="faculty"
        badge={<div />}
        showCategory={false}
        onSelectHandler={() => this.props.updateGetCoursesId(menu.id)}
      >
        <SideMenuDrill.Navigation>
          <SideMenu.NavigationCategory>בחר חוג</SideMenu.NavigationCategory>
          {this.renderDynamicNavigation(menu.items)}
        </SideMenuDrill.Navigation>
      </SideMenuDrill.SubMenu>
    );
  }

  renderLink(link: Item): JSX.Element {
    return (
      <SideMenuDrill.Link
        key={link.title}
        isActive={link.isActive}
        data-hook="school"
      >
        <a onClick={e => this.onMenuSelected(e, link)}>{link.title}</a>
      </SideMenuDrill.Link>
    );
  }

  onMenuSelected(e: any, link: Item): void {
    e.preventDefault();
    const items = [...this.state.items];
    this.selectMenu(items, link);
    this.setState({ items });
  }

  selectMenu(items: Item[], link: Item): void {
    items.forEach(item => {
      item.isActive = item === link;

      if (item.items) {
        this.selectMenu(item.items, link);
      }
    });
  }

  renderStaticNavigation(): JSX.Element {
    return (
      <div>
        <SideMenu.NavigationLink
          isDiminishedHover
          // onClick={(): void => this.setState({ isHelpModalOpen: true })}
          data-hook="help-link"
        >
          עזרה
        </SideMenu.NavigationLink>
        <SideMenu.NavigationLink
          data-hook="about-link"
          isDiminishedHover
          // onClick={(): void => this.setState({ isAboutModalOpen: true })}
        >
          אודות
        </SideMenu.NavigationLink>
        <SideMenu.NavigationLink
          // onClick={(): void => this.setState({ isContactUsModalOpen: true })}
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
      <SideMenu.Footer>
        <SideMenu.FooterLink data-hook="footer">
          © כל הזכויות שמורות
        </SideMenu.FooterLink>
      </SideMenu.Footer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateGetCoursesId: (id: string): void => dispatch(updateGetCoursesId(id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SideBar);

//   renderModals(): JSX.Element {
//     return (
//       <div>
//         {this.renderHelpModal()}
//         {this.renderAboutModal()}
//         {this.renderContactUsModal()}
//       </div>
//     );
//   }

//   renderHelpModal(): JSX.Element {
//     return (
//       <Modal
//         isOpen={this.state.isHelpModalOpen}
//         onRequestClose={(): void => this.setState({ isHelpModalOpen: false })}
//         contentLabel="עזרה"
//       >
//         <div style={{ direction: 'rtl' }}>
//           <MessageBoxFunctionalLayout
//             dataHook="help-modal"
//             onCancel={(): void => this.setState({ isHelpModalOpen: false })}
//             theme="blue"
//             title="עזרה"
//             hideFooter
//             withEmptyState
//           />
//         </div>
//       </Modal>
//     );
//   }

//   renderAboutModal(): JSX.Element {
//     return (
//       <Modal
//         contentLabel="אודות"
//         isOpen={this.state.isAboutModalOpen}
//         onRequestClose={(): void => this.setState({ isAboutModalOpen: false })}
//       >
//         <div style={{ direction: 'rtl' }}>
//           <MessageBoxFunctionalLayout
//             dataHook="about-modal"
//             onCancel={(): void => this.setState({ isAboutModalOpen: false })}
//             theme="blue"
//             title="אודות"
//             hideFooter
//             withEmptyState
//           />
//         </div>
//       </Modal>
//     );
//   }

//   renderContactUsModal(): JSX.Element {
//     return (
//       <Modal
//         contentLabel="ליצירת קשר"
//         isOpen={this.state.isContactUsModalOpen}
//         onRequestClose={(): void =>
//           this.setState({ isContactUsModalOpen: false })
//         }
//       >
//         <div style={{ direction: 'rtl' }}>
//           <MessageBoxFunctionalLayout
//             dataHook="contact-us-modal"
//             onCancel={(): void =>
//               this.setState({ isContactUsModalOpen: false })
//             }
//             theme="blue"
//             title="ליצירת קשר"
//             hideFooter
//             withEmptyState
//           />
//         </div>
//       </Modal>
//     );
//   }
