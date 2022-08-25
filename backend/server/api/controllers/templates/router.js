import * as express from "express";
import controller from "./controller";

export default express
  .Router()
  .get("/all/:type", controller.all)
  .post("/create", controller.createTemplate)
  .post("/remove", controller.deleteTemplate)
  .post("/update", controller.updateTemplate);
