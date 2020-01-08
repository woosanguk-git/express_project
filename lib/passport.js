//passport.js 모듈은 아래 함수 자체가 되는것이다.

module.exports = function(app, connection) {
  // passport 는 세션을 내부적으로 사용하기 때문에 세션을 활성와 시키는 코드 다음에 등장해야한다.
  var passport = require("passport");
  var LocalStrategy = require("passport-local").Strategy;

  app.use(passport.initialize()); //passport를 express 에 설치.
  app.use(passport.session());
  // passport가 내부적으로 session을 사용함.

  passport.serializeUser(function(user, done) {
    console.log("serializeUser", user);
    done(null, user.id);
    // user.id 는 식별자를 사용하면된다.
    // serializeUser는 로그인 성공하는 순간 딱 한번 호출되는데
    // 세션스토어에 정보를 저장하는 역활을 한다.
  });

  passport.deserializeUser(function(id, done) {
    // deserializeUser는 로그인이 성공하면 페이지를 방문할때 마다
    // deserializeUser의 콜백함수가 실행되도록 약속되어있음.
    // 사용자의 실제 데이터를 조회해서 가져오는 것이다.
    // 로그인 성공후 serializeUser 실행 후
    // 각각의 페이지를 방문할 때마다 로그인한 사용자인지 아닌지를 체크하는 역활.
    // 그래서 새로고침할 때마다 호출되는 것이다.
    // done 함수에 사용자 실제 정보를 넣어준 것이다,
    console.log("deserializeUser", id);
    const lookUpQuery = `select id, displayname from user where id = '${id}'`;
    connection.query(lookUpQuery, function(error, data) {
    //   console.log("data check : ", data[0]);
      done(null, data[0]);
    });
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "pwd"
      },
      function(username, password, done) {
        // done이라는 함수를 어떻게 사용하느냐 따라 실패 성공여부를 알릴 수 있다.
        console.log("LocalStrategy", username, password);
        const userSelectQuery = `select id, password from user where id = '${username}'`;
        connection.query(userSelectQuery, function(error, data) {
          console.log(data[0].id);
          if (username === data[0].id) {
            console.log("아이디 일치.");
            if (password === data[0].password) {
              console.log("패스워드 일치.");
              //사용자의 정보를 passport 한테 알려준다.
              return done(null, data[0]);
              // 성공하면 done(null, data[0]); 는
              // 위에 passport.serializeUser(function(user, done)에
              // user 파라미터에 data[0]를 전달한다.
            } else {
              console.log("PASSWORD가 일치하지 않습니다.");
              return done(null, false, {
                message: "Incorrect password."
              });
            }
          } else {
            console.log("ID가 존재하지 않거나 일치하지 않습니다.");
            return done(null, false, {
              message: "Incorrect username."
            });
          }
        });
      }
    )
  );
  return passport;
};
