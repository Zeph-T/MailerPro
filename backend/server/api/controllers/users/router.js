import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/', controller.getUser)
  .post('/register', controller.register)
  .post('/login', controller.login);
