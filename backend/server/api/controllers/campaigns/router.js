import * as express from "express";
import controller from "./controller";

export default express
  .Router()
  .post("/create", controller.create)
  .post("/update", controller.update)
  .get("/", controller.all)
  .get('/campaignById/:id',controller.getCampaignById)
  .post('/getStats',controller.getCampaignStatisticsByIds);
