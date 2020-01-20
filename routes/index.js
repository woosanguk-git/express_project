var express = require("express");
var router = express.Router();

const db_config = require("../config/database");
const mysql = require("mysql");
// const connection = mysql.createConnection(db_config);

/* GET home page. */
router.get("/", function(req, res, next) {
  // console.log("/", req.user);  

  console.log("req.session ", req.session);
  res.render("index", { title: "Express" });
});

module.exports = router;
