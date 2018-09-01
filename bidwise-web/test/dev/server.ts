import * as express from 'express';
import * as session from 'express-session';
import { renderVM } from './vm';
import { ENDPOINTS } from '../../src/services/faculties-server-api';
import {
  aFaculty,
  asFacultiesResponse,
  FacultyBuilder,
} from '../builders/faculties.builder';

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
      new FacultyBuilder(aFaculty()).build(),
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
