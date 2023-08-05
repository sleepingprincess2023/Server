const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const signupRouter = require("./router/signup");
const loginRouter = require("./router/login");
const dbconfig = require("./config/db");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const connection = mysql.createPool(dbconfig);

connection.getConnection(() => {
  try {
    console.log("Mysql connect...");
  } catch (err) {
    throw err;
  }
});

// api
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Sever on port: ${process.env.PORT}`);
});
