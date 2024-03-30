require("dotenv").config();
const jwtToken = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwtToken.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
