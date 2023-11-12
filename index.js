const express = require("express");
const cors = require("cors");
const { connectDB, db } = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 5000;
// const publicRoutes = require("./routes/publicRoutes/index");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// connect with database
connectDB();

app.post("/post", async (req, res) => {
  db.query(
    "CREATE TABLE BLOG(ID int(20) NOT NULL AUTO_INCREMENT, TITLE varchar(100) NOT NULL, BODY varchar(100) NOT NULL, PRIMARY KEY(ID))",
    (error, results) => {
      if (error) throw error;
      console.log(results);
      res.send(results);
    }
  );
});

// base API
app.get("/", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin"
    // "https://blended-learning-center.netlify.app"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send("Hello Buddy !");
});

// Helth check
app.listen(port, () => {
  console.log("Server is runing at port ", port);
});
