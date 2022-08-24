const crypto = require("crypto");

class PasswordService {
  // Converting plain-text based pswd into a unique hash and salt
  createPassword(pswd) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto
      .pbkdf2Sync(pswd, salt, 10000, 64, "sha512")
      .toString("hex");

    return {
      salt,
      hash,
    };
  }

  // Checking plain-text pswd against an existing hash
  checkPassword(pswd, hash, salt) {
    const originalHash = crypto
      .pbkdf2Sync(pswd, salt, 10000, 64, "sha512")
      .toString("hex");
    return hash === originalHash;
  }
}

export default new PasswordService();
