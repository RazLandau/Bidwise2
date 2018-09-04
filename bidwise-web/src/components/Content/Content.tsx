import * as React from 'react';
import Page from 'wix-style-react/Page';
import Breadcrumbs from 'wix-style-react/Breadcrumbs';
import { Layout, Cell } from 'wix-style-react/Layout';
import * as styles from './Content.scss';
import CourseCard from './CourseCard/CourseCard';
import { CoursesServerApi } from '../../services/courses-server-api';

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

class Content extends React.Component {
  readonly state: ContentState = {
    loaded: false,
    courses: [],
  };
  CoursesServerApi = new CoursesServerApi();

  async componentDidMount() {
    const courses = (await this.CoursesServerApi.getCourses()).courses;
    this.setState({
      loaded: true,
      courses,
    });
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
                  <CourseCard
                    title={course.name}
                    easy={course.easy}
                    interesting={course.interesting}
                    recommended={course.recommended}
                    comments={course.comments}
                  />
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

export default Content;
