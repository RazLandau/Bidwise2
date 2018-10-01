import * as express from 'express';
import * as session from 'express-session';
import { renderVM } from './vm';
import {
  complexityCourse,
  expsyCourse,
  asCoursesResponse,
  CourseBuilder,
  // eastereggCourse,
} from '../builders/courses.builder';
import { COURSES_ENDPOINTS } from '../../src/services/courses-server-api';
import { FEEDBACKS_ENDPOINTS } from '../../src/services/feedbacks-server-api';
import {
  asFeedbacksResponse,
  interestingFeedback,
  easyFeedback,
  FeedbackBuilder,
  goodFeedback,
  mediocreFeedback,
  badFeedback,
  eastereggFeedback,
  recommendedFeedback,
} from '../builders/feedbacks.builder';

export function start() {
  const app = express();

  app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    }),
  );

  app.get(COURSES_ENDPOINTS.COURSES, (req, res) => {
    const response = asCoursesResponse([
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      new CourseBuilder(complexityCourse()).build(),
      new CourseBuilder(expsyCourse()).build(),
      // new CourseBuilder(eastereggCourse()).build(),
    ]);
    res.send(response);
  });

  app.get(FEEDBACKS_ENDPOINTS.getFeedbacks('complexity'), (req, res) => {
    const response = asFeedbacksResponse([
      new FeedbackBuilder(interestingFeedback()).build(),
      new FeedbackBuilder(easyFeedback()).build(),
      new FeedbackBuilder(recommendedFeedback()).build(),
    ]);
    res.send(response);
  });

  app.get(FEEDBACKS_ENDPOINTS.getFeedbacks('expsy'), (req, res) => {
    const response = asFeedbacksResponse([
      new FeedbackBuilder(goodFeedback()).build(),
      new FeedbackBuilder(mediocreFeedback()).build(),
      new FeedbackBuilder(badFeedback()).build(),
    ]);
    res.send(response);
  });

  app.get(FEEDBACKS_ENDPOINTS.getFeedbacks('easteregg'), (req, res) => {
    const response = asFeedbacksResponse([
      new FeedbackBuilder(eastereggFeedback()).build(),
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
