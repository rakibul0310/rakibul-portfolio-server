const { checkHaveAdmin, register, login } = require("./authController");

module.exports = {
  checkHaveAdmimController: checkHaveAdmin,
  registerController: register,
  loginController: login,
};
