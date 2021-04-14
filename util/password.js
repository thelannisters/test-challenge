const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const validPassword = (password, hash, salt) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};

const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

const signJwt = (payload) => {
  return jwt.sign({ _id: payload.id, iat: Date.now() }, "Techbase is rock", {
    expiresIn: 3600,
  });
};

module.exports = { validPassword, genPassword, signJwt };
