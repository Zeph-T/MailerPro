import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/getAllTags',controller.all)
  .post('/createTag', controller.create)
  .post('/addTagToContact', controller.addTagToContact)
  .post('deleteTag',controller.deleteTag)