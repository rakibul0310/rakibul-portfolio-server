// const jwt = require("jsonwebtoken");

const { verify_Jwt } = require("../config/generateToken");

const verifyToken = async (req, res, next) => {
  if (typeof req.headers["authorization"] === "undefined") {
    res.status(401).send({
      error: {
        message: "Not authorized, cannot find token",
      },
    });
  } else {
    let token = req.headers["authorization"];
    let decoded = verify_Jwt(token);
    if (decoded.status) {
      req.auth = decoded.data;
      next();
    } else {
      res.status(401).send({
        error: {
          message: "Unauthorized access",
        },
      });
    }
  }
};

// const verifyAdmin = async (req, res, next) => {
//   try {
//     const requester = req.auth.id;
//     const requesterAccount = await User.findOne({ email: requester });
//     if (requesterAccount?.role === "admin") {
//       next();
//     } else {
//       res.status(401).send({
//         error: {
//           message: "Not authorized, token failed",
//         },
//       });
//     }
//   } catch (e) {
//     res.status(401).send({
//       error: {
//         message: e.message,
//       },
//     });
//   }
// };

module.exports = { verifyToken };
