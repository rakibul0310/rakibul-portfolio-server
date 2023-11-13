const express = require("express");
const {
  checkHaveAdmimController,
  registerController,
  loginController,
} = require("../Controllers");
const router = express.Router();

router.get("/have-admin", checkHaveAdmimController);
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
