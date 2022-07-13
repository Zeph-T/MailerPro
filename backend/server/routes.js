import examplesRouter from './api/controllers/examples/router';

export default function routes(app) {
  app.use('/Y/examples', examplesRouter);
}
