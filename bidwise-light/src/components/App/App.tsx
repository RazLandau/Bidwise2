import * as React from 'react';
import SideBar from '../SideBar/SideBar';
import MainPage from '../MainPage/MainPage';

export interface AppProps {}

class App extends React.Component<AppProps> {
  render() {
    return (
      <div>
        <SideBar />
        <MainPage />
      </div>
    );
  }
}

export default App;
