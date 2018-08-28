import * as React from 'react';
import SideMenu from '../SideMenu/SideMenu';

export interface AppProps {}

class App extends React.Component<AppProps> {
  render() {
    return (
      <div>
        <SideMenu />
      </div>
    );
  }
}

export default App;
