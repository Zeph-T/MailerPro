import * as jwt from "jsonwebtoken";
import env from "../../config/env";
class AuthenticationService {
  /**
   * Generate the JWT Token for the user
   * @param {String} id - ID of the user
   */
  generateToken(id , isAdmin) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 1000000); //Infinite Expiry!

    return jwt.sign(
      {
        userId : id,
        isAdmin : isAdmin ? true : false, 
        exp: exp.getTime() / 1000,
      },
      env.JWT_SECRET
    );
  }
}

export default new AuthenticationService();
