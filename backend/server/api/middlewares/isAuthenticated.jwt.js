import * as jwt from "jsonwebtoken";
import env from "../../config/env";
import mongoose from "mongoose";
// eslint-disable-next-line no-unused-vars, no-shadow
export default async function isAuthenticated(req, res, next) {
  let token = req.headers.authorization;
  if (!token)
    res.status(401).json({ message: "Not Authorized. Token missing" });
  else {
    try {
      token = token.split(" ")[1];
      const doc = jwt.verify(token, env.JWT_SECRET);
      req.user = mongoose.Types.ObjectId(doc.userId.toString());
      req.isAdmin = ["superAdmin", "admin"].includes(doc.adminRole);
      next();
    } catch (err) {
      res
        .status(401)
        .json({ message: err.message || "Unauthorized. Invalid Token" });
    }
  }
}
