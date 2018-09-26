import * as React from 'react';
import { connect } from 'react-redux';
import Courses from '../Courses/Courses';
import Course from '../Course/Course';
import Header from '../Header/Header';
import AddComment from '../AddComment/AddComment';
import * as styles from './App.scss';

export interface AppProps {
  course: string;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <div className={styles.app}>
        <AddComment />
        <Header />
        {this.props.course ?
          <Course /> : <Courses />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  course: state.course,
})

export default connect(mapStateToProps)(App);
