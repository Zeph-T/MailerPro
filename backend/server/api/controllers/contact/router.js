import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/all',controller.all)
  .post('/add',controller.addContact)
  .post('/remove',controller.removeContact)
  .post('/update',controller.updateContact);