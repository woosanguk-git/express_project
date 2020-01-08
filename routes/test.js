var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    // passport 가 req에 user 이라는 객체를 만들어주는것이다.
    // 로그인 되어있다면 req.user가 들어있어서 True일 거싱고
    // 로그인이 되어있지 않다면 false 일 것이다.
    // req.user 를 이용하여 로그인 상태를 확인하여 뷰를 적용시킨다.
    console.log('/test', req.user); 
    if(req.user){
        res.render('test', {userId : req.user.id});
    }else{
        res.render('test',{text : 'login fail'});
    }
});

  

module.exports = router;
