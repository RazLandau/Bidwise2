import * as React from 'react';
import * as styles from './App.scss';

export interface AppProps {}

class App extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <h2 data-hook="title">Hello World!</h2>
        </div>
        <p className={styles.intro}>intro</p>
      </div>
    );
  }
}

export default App;
