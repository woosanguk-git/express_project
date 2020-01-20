// app.js 는 미들웨어를 관리하는 부분이다.

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
const session = require("express-session");
// const FileStore = require("session-file-store")(session);


//mysql session store
const mysql = require("mysql");
var MySQLStore = require("express-mysql-session")(session);
var options = {
  host: "localhost",
  port: 3306,
  user: "test_user",
  password: "Qkddnr93!",
  database: "test_DB"
};
const connection = mysql.createConnection(options);
var sessionStore = new MySQLStore({}, connection);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var boardRouter = require("./routes/board");

var testRouter = require("./routes/test");

// app이 http.createServer에서 원하는 요청 핸들러 함수이다.
var app = express();

// view engine setup
// ejs파일을 저장할때 view폴더에 저장하면
// app.js 에서 알아서 views 폴더 안에 ejs파일을 사용
app.set("views", path.join(__dirname, "views"));

// view engine으로 ejs를 사용한다.
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   session({
//     secret: "keyboard cat", // 암호화
//     resave: false, // fasle 면 데이터가 변경될 때만 세션을 저장
//     saveUninitialized: true, // 세션이 필요할때만 세션을 구동 (true)
//     store: new FileStore()
//   })
// );
app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);
//passport 모듈 가져오기
const passport = require("./lib/passport")(app, connection);
// deserializeUser 가 호출되지 않는 문제 =>
// const passport = require("./lib/passport")(app, connection);를
// 세션 미들웨어 등록부분 이후에 호출하니 해결되었음 60~69번 줄 소스코드
// 그 전에 호출하니 deserializeUser 가 호출 되지 않앗음 하 ㅅㅂ

app.post(
  "/auth/login_process",
  passport.authenticate("local", {
    successRedirect: "/board/main",
    failureRedirect: "/"
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/board", boardRouter);
app.use("/test", testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
