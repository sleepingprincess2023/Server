const express = require("express"); // NodeJS 웹 프레임워크
const app = express();
const mysql = require("mysql2");
const dbconfig = require("../config/db");
const bcrypt = require("bcrypt");
const router = express.Router();

const connection = mysql.createPool(dbconfig);

// const { connection } = require("../utils/query");

router.post("/", async (req, res) => {
  const { user_name, uuid, password } = req.body;
  try {
    const query = "SELECT uuid FROM users WHERE uuid = ?";
    const [results] = await connection.promise().query(query, uuid);

    if (results.length > 0) {
      return res.status(400).json({
        error: "이미 존재하는 아이디입니다",
      });
    }

    const salt = await bcrypt.genSalt(Number(8));
    const hashedPassword = await bcrypt.hash(String(password), salt);

    const register_values = [user_name, uuid, hashedPassword];

    const insert_query =
      "INSERT INTO users(user_name, uuid, password) VALUES (?, ?, ?)";
    connection.query(insert_query, register_values);

    return res
      .status(200)
      .json({ message: "회원가입이 성공적으로 되었습니다" });
  } catch (err) {
    return res.status(500).json({ error: "내부 서버 오류가 발생하였습니다" });
  }
});

module.exports = router;
