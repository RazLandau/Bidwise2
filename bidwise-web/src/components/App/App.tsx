import * as React from 'react';
import SideBar from '../SideBar/SideBar';
import Content from '../Content/Content';

export interface AppProps {}

class App extends React.Component<AppProps> {
  render() {
    return (
      <div>
        <SideBar />
        <Content />
      </div>
    );
  }
}

export default App;
