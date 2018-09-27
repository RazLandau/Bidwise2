import * as React from 'react';
import { connect } from 'react-redux';
import Courses from '../Courses/Courses';
import Course from '../Course/Course';
import Header from '../Header/Header';
import AddComment from '../AddComment/AddComment';
import * as styles from './App.scss';

export interface AppProps {
  course: string;
  isAddModalOpen: boolean
}

class App extends React.Component<AppProps> {
  render() {
    const { isAddModalOpen, course } = this.props;
    return (
      <div className={styles.app}>
        {isAddModalOpen ?  <AddComment /> : undefined}
        <Header />
        {course ?
          <Course /> : <Courses />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAddModalOpen: state.isAddModalOpen,
  course: state.course,
})

export default connect(mapStateToProps)(App);
