import * as express from "express";
import controller from "./controller";

export default express
  .Router()
  .get("/", controller.getUser)
  .post("/register", controller.register)
  .post("/login", controller.login)
  .post("/changePassword", controller.changePassword)
  .post("/addAdmin", controller.addAdmin)
  .post("/removeAdmin", controller.removeAdmin)
  .get("/getAdmins", controller.getAdmins)
  .post("/updateUser", controller.updateUser);
