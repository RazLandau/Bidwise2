import * as React from 'react';
import { connect } from 'react-redux';
import Courses from '../Courses/Courses';
import Course from '../Course/Course';
import Header from '../Header/Header';
import AddComment from '../AddComment/AddComment';
import * as styles from './App.scss';
import { CoursesServerApi } from '../../services/courses-server-api';
import { FeedbacksServerApi } from '../../services/feedbacks-server-api';

export interface AppProps {
  course: {name: string, id: string };
  isAddModalOpen: boolean
}

export interface AppState {
  loaded: boolean;
  courses: {}[];
}

class App extends React.Component<AppProps, AppState> {
  readonly state: AppState = {
    loaded: false,
    courses: [],
  };

  coursesServerApi = new CoursesServerApi();
  feedbacksServerApi = new FeedbacksServerApi();

  async componentDidMount() {
    const courses = (await this.coursesServerApi.getCourses()).courses;
    const stats = {
      comments: courses.map(course => course.comments).reduce((a, b) => a + b, 0),
      courses: courses.length,
      schools: new Set([...courses.map(course => course.school)]).size,
      faculties: new Set([...courses.map(course => course.faculty)]).size
    }
    this.setState({
      loaded: true,
      courses,
      stats,
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.course && this.props.course !== prevProps.course) {
      const { id } = this.props.course;
      const feedbacks = (await this.feedbacksServerApi.getFeedbacks({
        id,
      })).feedbacks;
      this.setState({
        feedbacks,
        loaded: true,
      });
    }
  }

  render() {
    const { isAddModalOpen, course } = this.props;
    const { loaded, courses, feedbacks, stats } = this.state;

    return loaded ? (
      <div className={styles.app}>
        {isAddModalOpen ?  <AddComment /> : undefined}
        <Header stats={stats} />
        {course && feedbacks ?
          <Course feedbacks={feedbacks} /> : <Courses courses={courses} />
        }
      </div>
    ) : (
      <div data-hook="is-loading" />
    )
  }
}

const mapStateToProps = state => ({
  isAddModalOpen: state.isAddModalOpen,
  course: state.course,
})

export default connect(mapStateToProps)(App);
