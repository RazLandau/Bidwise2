import * as React from 'react';
import SideMenu from '../SideMenu/SideMenu';
import Content from '../Content/Content';

export interface AppProps {}

class App extends React.Component<AppProps> {
  render() {
    return (
      <div>
        <SideMenu />
        <Content />
      </div>
    );
  }
}

export default App;
