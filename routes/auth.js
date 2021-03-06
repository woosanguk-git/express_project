var express = require("express");
var router = express.Router();

const dbConfig = require("../config/database");
const mysql = require("mysql");
const connection = mysql.createConnection(dbConfig);

// router.post("/login_process", function(req, res, next) {
//   let post = req.body;
//   let id = post.id;
//   let pwd = post.pwd;
//   if (id === testAuthData.id && pwd === testAuthData.password) {
//     req.session.is_logined = true;
//     req.session.userId = id;
//     authLoginCheck(req, res);
//     // session.save는 세션정보를 저장하는 작업을 바로 실행한다.
//     req.session.save(function(err) {
//       res.render("test", {userId : req.session.userId});
//       console.log(req.session);
//     });
//   } else {
//     res.send("fail");
//   }
// });

router.get("/logout", function(req, res, next) {
  req.logout(); // passport 에서 넣어둔 기능.

  // 콜백함수 시간차에 의한 여러가지 오류를 이코드를 통해서 임시적으로 고침.
  req.session.save(function() {
    res.redirect("/");
  });
});

router.get("/register", function(req, res, next) {
  res.render("register");
});

router.post("/register_process", function(req, res, next) {
  let userData = req.body; // body-parser moudle 사용
  console.log("유저데이터", userData);
  console.log("리퀘바디", req.body);
  const userInsertQuery = `insert into user values('${userData.id}','${userData.pwd}','${userData.displayName}','${userData.name}')`;
  // console.log(userData.id);
  connection.query(userInsertQuery, function(error, result) {
    if (error) {
      console.error("Register data insert error in mysql");
      console.error(error);
    }
    const resData = {result : true}
    res.json(resData);
  });
});

router.post("/register", function(req, res, next) {
  const registerData = req.body.data;
  const type = req.body.type;
  let checkQuery = "";
  // console.log("123123123", registerData);
  // console.log("123123123", type);
  if (type == "id") {
    checkQuery= `SELECT count(id) as num FROM user WHERE id = '${registerData}'`;
  } else if(type =="displayname"){
    checkQuery = `SELECT count(id) as num FROM user WHERE displayname = '${registerData}'`;
  }
  connection.query(checkQuery, function(error, data) {
    const count = data[0].num;
    console.log(count);
    // console.log(typeof count);
    const resData = { count: count };
    res.json(resData);
  });
});

module.exports = router;
