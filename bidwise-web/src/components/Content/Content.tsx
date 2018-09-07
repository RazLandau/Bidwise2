import * as React from 'react';
import { connect } from 'react-redux';
import Page from 'wix-style-react/Page';
import Breadcrumbs from 'wix-style-react/Breadcrumbs';
import { Layout, Cell } from 'wix-style-react/Layout';
import * as styles from './Content.scss';
import CourseCard from './CourseCard/CourseCard';
import { CoursesServerApi } from '../../services/courses-server-api';

export interface ContentProps {
  getCoursesId: string;
}

export interface ContentState {
  loaded: boolean;
  courses: {
    name: string;
    easy: number;
    interesting: number;
    recommended: number;
    comments: number;
  }[];
}

class Content extends React.Component<ContentProps> {
  readonly state: ContentState = {
    loaded: false,
    courses: [],
  };
  CoursesServerApi = new CoursesServerApi();

  componentDidMount() {
    this.setState({
      loaded: true,
    });
  }

  async componentDidUpdate(prevProps) {
    const { getCoursesId } = this.props;
    if (getCoursesId !== prevProps.getCoursesId) {
      const courses = (await this.CoursesServerApi.getCourses({ getCoursesId }))
        .courses;
      this.setState({
        courses,
      });
    }
  }

  render() {
    const { loaded, courses } = this.state;
    return loaded ? (
      <div data-hook="content" className={styles.content}>
        <Page>
          <Page.Header breadcrumbs={<Breadcrumbs items={[]} />} />
          <Page.Content>
            <Layout>
              {courses.map(course => (
                <Cell key={course.name} span={3}>
                  <div data-hook="course">
                    <CourseCard
                      title={course.name}
                      easy={course.easy}
                      interesting={course.interesting}
                      recommended={course.recommended}
                      comments={course.comments}
                    />
                  </div>
                </Cell>
              ))}
            </Layout>
          </Page.Content>
        </Page>
      </div>
    ) : (
      <div data-hook="is-loading" />
    );
  }
}

function mapStateToProps(state) {
  return {
    getCoursesId: state.getCoursesId,
  };
}

export default connect(mapStateToProps)(Content);
