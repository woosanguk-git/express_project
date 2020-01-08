var express = require("express");
var router = express.Router();

const dbConfig = require("../config/database");
const mysql = require("mysql");
const connection = mysql.createConnection(dbConfig);

// 노트북리스트
// 노트리스트
let nbList;
let nList;

router.get("/main", function(req, res, next) {
  console.log("/board/main", req.user);
  const userid = req.user.id;
  const notebookListQuery = `SELECT id, title FROM notebook where creuser = '${userid}'`;
  connection.query(notebookListQuery, function(error, data) {
    if (error) {
      console.error("노트북 리스트 로드 오류!");
      console.error(error);
    }
    console.log(data);
    nbList = data;
    res.render("main", {
      userDisplayname: req.user.displayname,
      notebookList: data
    });
  });
});

router.post("/createNotebook_process", function(req, res, next) {
  const post = req.body;
  const bookname = post.notebookName;
  const userid = req.user.id;
  const createNotebookQuery = `INSERT INTO notebook(title, modidate,creuser) VALUES('${bookname}', NOW(), '${userid}')`;
  connection.query(createNotebookQuery, function(error, result) {
    if (error) {
      console.error("노트북 생성 오류 발생!");
      throw error;
    }
    res.redirect("/board/main");
  });
  //   console.log("usertest", req.user.id);
});

router.get("/:notebookId", function(req, res, next) {
  // console.log("clean url ~")
  // params에는 노트북 네임이 들어온다.
  console.log("노트북 ID : ", req.params.notebookId);
  const notebookId = req.params.notebookId;
  // res.redirect("/board/main");
  // todo 
  const noteListQuery = `select id, title from note where notebookid = '${notebookId}'`;
  
  connection.query(noteListQuery, function(error, data) {
    if (error) {
      console.log("노트 리스트 불러오기 오류.");
      console.error(error);
    }
    console.log(data);
    nList = data;
    res.render("note", {
      userDisplayname: req.user.displayname,
      notebookList: nbList,
      noteList: data,
      nowNoteBookId: notebookId
    });
  });
});

router.get("/:notebookId/createNote", function(req, res, next) {
  const notebookId = req.params.notebookId;
  // console.log(notebookname);
  res.render("create", { nowNoteBookId: notebookId });
});

router.post("/:notebookId/createNote_process", function(req, res, next) {
  const post = req.body;
  const notename = post.title;
  const content = post.content;
  const notebookId = req.params.notebookId;
  const createNoteQuery = `insert into note(title, content, modidate, notebookid) values('${notename}', '${content}', NOW(), ${notebookId})`;
  connection.query(createNoteQuery, function(error, result) {
    if (error) {
      console.error("노트 생성 오류 발생!");
      console.error(error);
    }
    console.log(notebookId);
    res.redirect(`/board/${notebookId}`);
  });
  //   console.log("usertest", req.user.id);
});


router.get("/:notebookId/:noteId", function(req, res, next) {
  console.log("노트 아이디", req.params.noteId);
  const notebookId = req.params.notebookId;
  const noteId = req.params.noteId;
  const noteContentQuery = `SELECT id, title, content FROM note WHERE id = '${noteId}' and notebookid = '${notebookId}'`;
  connection.query(noteContentQuery, function(error, data) {
    if (error) {
      console.log("노트 내용 불러오기 오류.");
      console.error(error);
    }
    // console.log("노트내용 데이터 : ",data)
    res.render("content", {
      userDisplayname: req.user.displayname,
      notebookList: nbList,
      noteList: nList,
      noteData: data,
      nowNoteBookId: notebookId
    });
  });
}); 


router.get("/:notebookId/:noteId/noteModify", function(req,res,next){
  const notebookId = req.params.notebookId;
  const noteId = req.params.noteId;
  const noteContentQuery = `SELECT id, title, content FROM note WHERE id = '${noteId}' and notebookid = '${notebookId}'`;
  connection.query(noteContentQuery, function(error, data) {
    if (error) {
      console.log("노트 내용 불러오기 오류.");
      console.error(error);
    }
    console.log("노트내용 데이터 : ",data)
    res.render("note_modify", {
      userDisplayname: req.user.displayname,
      notebookList: nbList,
      noteList: nList,
      noteData: data,
      nowNoteBookId: notebookId,
      nowNoteId : noteId
    });
  });
})

router.post("/:notebookId/:noteId/noteModify_process", function(req,res,next){
  const notebookId = req.params.notebookId;
  const noteId = req.params.noteId;
  const post = req.body;
  const notename = post.title;
  const content = post.content;

  const noteUpdateQuery = `UPDATE note SET title = '${notename}', content = '${content}', modidate = NOW() WHERE id = ${noteId} AND notebookid = ${notebookId}`
  connection.query(noteUpdateQuery, function(error,result){
    if (error) {
      console.log("노트 내용 수정 오류.");
      console.error(error);
    }
    // console.log("결과 : ", result);
    res.redirect(`/board/${notebookId}/${noteId}`);
  })
});

router.get("/:notebookId/:noteId/noteDelete_process", function(req, res, next){
  const notebookId = req.params.notebookId;
  const noteId = req.params.noteId;

  const noteDeleteQuery = `DELETE FROM note WHERE id = ${noteId} AND notebookid = ${notebookId}`
  connection.query(noteDeleteQuery, function(error, result){
    if (error) {
      console.log("노트 삭제 오류.");
      console.error(error);
    }
    // console.log("결과 : ", result);  // TO DO result 이용해서 결과알리기
    res.redirect(`/board/${notebookId}/`);
  })
})
module.exports = router;
