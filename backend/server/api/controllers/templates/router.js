import * as express from "express";
import controller from "./controller";

export default express
  .Router()
  .get("/all/:type", controller.all)
  .get("/getTemplate/:templateId", controller.getTemplate)
  .post("/create/:type", controller.createTemplate)
  .post("/remove", controller.deleteTemplate)
  .post("/update", controller.updateTemplate);
