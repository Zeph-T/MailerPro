import Express from 'express';

import cors from 'cors';

import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import l from './logger';
import * as OpenApiValidator from 'express-openapi-validator';
import errorHandler from '../api/middlewares/error.handler';
import env from '../config/env';

import mongo from './mongo';

const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);

    const apiSpec = path.join(__dirname, 'api.yml');
    const validateResponses = !!(
      env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
      env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    );

    app.use(bodyParser.json({ limit: env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: env.REQUEST_LIMIT || '100kb' }));

    app.use(Express.static(`${root}/public`));

    app.use(env.OPENAPI_SPEC || '/spec', Express.static(apiSpec));
    app.use(
      OpenApiValidator.middleware({
        apiSpec,
        validateResponses,
        ignorePaths: /.*\/spec(\/|$)/,
      })
    );

    app.use(cors());
  }

  router(routes) {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port = env.PORT) {
    const welcome = (p) => () =>
      l.info(
        `up and running in ${
          env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    mongo().then(() => {
      l.info('Database Loaded!');
      http.createServer(app).listen(port, welcome(port));
    });

    return app;
  }
}
