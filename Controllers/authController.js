const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/generateToken");
// CREATE TABLE admin(ID int(5) NOT NULL, Email varchar(20) NOT NULL, Name varchar(20), Password varchar(200) NOT NULL, PRIMARY KEY(ID));

const checkHaveAdmin = async (req, res) => {
  try {
    db.query("SELECT Email FROM admin", (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result && result.length > 0) {
        res.status(200).json({ haveAdmin: true });
      } else {
        res.status(400).json({ haveAdmin: false });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // pasword hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // JWT token
    const token = generateToken(email);
    // save to DB
    db.query("SELECT * FROM admin", (err, result) => {
      // if table is not created yet
      if (err || !result) {
        // create table
        db.query(
          "CREATE TABLE admin(ID int(5) NOT NULL, Email varchar(50) NOT NULL, Name varchar(30), Password varchar(200) NOT NULL, Token varchar(600) NOT NULL, PRIMARY KEY(ID))",
          (err, result) => {
            if (err) throw err;
            if (result) {
              db.query(
                "INSERT INTO admin VALUES(?, ?, ?, ?, ?)",
                [10110, email, "Md. Rakibul Hasan", hashedPassword, token],
                (err, result) => {
                  if (err) throw err;
                  if (result) {
                    res.status(200).json({
                      message: "Created admin successfully.",
                    });
                  }
                }
              );
            }
          }
        );
      } else {
        if (result?.length === 0) {
          db.query(
            "INSERT INTO admin VALUES(?, ?, ?, ?, ?)",
            [10110, email, "Md. Rakibul Hasan", hashedPassword, token],
            (err, result) => {
              if (err) throw err;
              if (result) {
                res.status(200).json({
                  message: "Created admin successfully.",
                });
              }
            }
          );
        } else {
          res.status(400).json({
            message: "Already have an admin account!",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // get admin
    db.query(
      "SELECT Email, Password FROM Admin WHERE Email=?",
      [email],
      async (err, result) => {
        if (err) throw err;
        if (result?.length > 0) {
          const admin = result[0];
          if (
            admin?.Email &&
            admin?.Password &&
            (await bcrypt.compare(password, admin?.Password))
          ) {
            db.query(
              "SELECT Name, Email, Token FROM admin WHERE Email=?",
              [email],
              (err, result) => {
                if (err) {
                  res.status(400).json({
                    message: "Login faild. Please try again!",
                  });
                } else {
                  if (result?.length > 0) {
                    res.status(200).json(result);
                  }
                }
              }
            );
          } else {
            res.status(400).json({
              message: "Invalid credentials!",
            });
          }
        } else {
          res.status(400).json({
            message: "Can't find any admin!",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkHaveAdmin,
  register,
  login,
};
