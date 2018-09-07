import * as express from 'express';
import * as session from 'express-session';
import { renderVM } from './vm';
import { ENDPOINTS } from '../../src/services/faculties-server-api';
import {
  exactSciencesFaculty,
  socialSciencesFaculty,
  asFacultiesResponse,
  FacultyBuilder,
} from '../builders/faculties.builder';
import {
  csCourse,
  psyCourse,
  asCoursesResponse,
  CourseBuilder,
} from '../builders/courses.builder';
import { COURSES_ENDPOINTS } from '../../src/services/courses-server-api';

export function start() {
  const app = express();

  app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    }),
  );

  app.get(ENDPOINTS.getFaculties, (req, res) => {
    const response = asFacultiesResponse([
      new FacultyBuilder(exactSciencesFaculty()).build(),
      new FacultyBuilder(socialSciencesFaculty()).build(),
    ]);
    res.send(response);
  });

  app.get(COURSES_ENDPOINTS.getCourses('exact'), (req, res) => {
    const response = asCoursesResponse([new CourseBuilder(csCourse()).build()]);
    res.send(response);
  });

  app.get(COURSES_ENDPOINTS.getCourses('social'), (req, res) => {
    const response = asCoursesResponse([
      new CourseBuilder(psyCourse()).build(),
    ]);
    res.send(response);
  });

  app.use('/', (req, res) => {
    res.send(
      renderVM('./src/index.vm', {
        visitCount: req.session.visitCount,
      }),
    );
  });

  return app.listen(process.env.PORT, () => {
    console.info(`Fake server is running on port ${process.env.PORT}`);
  });
}
