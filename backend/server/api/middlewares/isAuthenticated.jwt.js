import * as jwt from "jsonwebtoken";
import env from '../../config/env';            

// eslint-disable-next-line no-unused-vars, no-shadow
export default async function isAuthenticated(req, res, next) {
  let token = req.headers.authorization;
  if (!token) res.status(401).json({ message: "Not Authorized. Token missing" });
  else {
    try {
      token = token.split(" ")[1];
      const userId = jwt.verify(token, env.JWT_SECRET);
      req.user = userId;
      next();
    } catch (err) {
      res.status(401).json({ message: err.message || "Unauthorized. Invalid Token" });
    }
  }
}