import * as React from 'react';
import { connect } from 'react-redux';
import Page from 'wix-style-react/Page';
import Breadcrumbs from 'wix-style-react/Breadcrumbs';
import { Layout, Cell } from 'wix-style-react/Layout';
import * as styles from './MainPage.scss';
import CourseCard from './CourseCard/CourseCard';
import FeedbackCard from './FeedbackCard/FeedbackCard';
import { CoursesServerApi } from '../../services/courses-server-api';
import { FeedbacksServerApi } from '../../services/feedbacks-server-api';

export interface MainPageProps {
  getCoursesId: string;
}

export interface MainPageState {
  loaded: boolean;
  courseId: string;
  courseName: string;
  courses: {
    name: string;
    id: string;
    easy: number;
    interesting: number;
    recommended: number;
    comments: number;
  }[];
  feedbacks: {
    date: string;
    lecturer: string;
    easy: number;
    interesting: number;
    recommended: number;
    text: string;
  }[];
}

class MainPage extends React.Component<MainPageProps> {
  readonly state: MainPageState = {
    loaded: false,
    courseId: undefined,
    courseName: undefined,
    courses: [],
    feedbacks: [],
  };
  CoursesServerApi = new CoursesServerApi();
  FeedbacksServerApi = new FeedbacksServerApi();

  componentDidMount() {
    this.setState({
      loaded: true,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { getCoursesId } = this.props;
    const { courseId } = this.state;
    if (courseId && courseId !== prevState.courseId) {
      const feedbacks = (await this.FeedbacksServerApi.getFeedbacks({
        courseId,
      })).feedbacks;
      this.setState({
        feedbacks,
      });
    }
    if (getCoursesId !== prevProps.getCoursesId) {
      const courses = (await this.CoursesServerApi.getCourses({ getCoursesId }))
        .courses;
      this.setState({
        courses,
        courseId: undefined,
        courseName: undefined,
      });
    }
  }

  render() {
    const { loaded, courses, courseId, feedbacks, courseName } = this.state;
    return loaded ? (
      <div className="rtl">
        <div data-hook="content" className={styles.content}>
          <Page>
            <Page.Header
              onBackClicked={() => {
                console.log('in');
                this.setState({ courseId: undefined, courseName: undefined });
              }}
              showBackButton={courseId !== undefined}
              title={courseName ? courseName : undefined}
              breadcrumbs={<Breadcrumbs items={[]} />}
            />
            <Page.Content>
              <Layout>
                {!courseId
                  ? courses.map(course => (
                      <Cell key={course.name} span={4}>
                        <div
                          onClick={() =>
                            this.setState({
                              courseId: course.id,
                              courseName: course.name,
                            })
                          }
                          data-hook="course"
                        >
                          <CourseCard
                            title={course.name}
                            easy={course.easy}
                            interesting={course.interesting}
                            recommended={course.recommended}
                            comments={course.comments}
                          />
                        </div>
                      </Cell>
                    ))
                  : feedbacks.map(feedback => (
                      <Cell key={feedback.date} span={4}>
                        <div data-hook="feedback">
                          <FeedbackCard
                            title={feedback.date}
                            subtitle={feedback.lecturer}
                            easy={feedback.easy}
                            interesting={feedback.interesting}
                            recommended={feedback.recommended}
                            text={feedback.text}
                          />
                        </div>
                      </Cell>
                    ))}
              </Layout>
            </Page.Content>
          </Page>
        </div>
      </div>
    ) : (
      <div data-hook="is-loading" />
    );
  }

  setCourse = (courseId: string) => this.setState({ courseId });
}

function mapStateToProps(state) {
  return {
    getCoursesId: state.getCoursesId,
  };
}

export default connect(mapStateToProps)(MainPage);
