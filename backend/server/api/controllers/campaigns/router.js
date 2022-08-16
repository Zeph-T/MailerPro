import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/createEmailCampaign', controller.create)
  .post('/updateEmailCampaign', controller.update)
  .get('/', controller.all)