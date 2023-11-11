const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rakibul_portfolio",
});

const connectDB = () => {
  try {
    db.connect(function (err) {
      if (err) {
        console.error("error connecting to DB: " + err.stack);
        return;
      }

      console.log("DB connected as id " + db.threadId);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB, db };
