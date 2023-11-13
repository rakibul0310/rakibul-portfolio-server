const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

const middleware = [verifyToken];

router.use(middleware);

// router.get("/user", userInfo);

module.exports = router;
