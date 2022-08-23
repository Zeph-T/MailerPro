import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/all',controller.all)
  .post('/create',controller.create)
  .post('/remove',controller.remove)