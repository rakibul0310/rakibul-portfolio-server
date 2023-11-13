const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SEC_KEY, {
    expiresIn: "30d",
  });
};

const verify_Jwt = (token) => {
  try {
    // tokenTrim = token.split(" ")[1];
    let decoded = jwt.verify(token, process.env.SEC_KEY);
    return { status: true, data: decoded };
  } catch (e) {
    return { status: false, message: e.message };
  }
};

module.exports = { generateToken, verify_Jwt };
