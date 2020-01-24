const registerForm = document.getElementById("js-user-register");
const idForm = registerForm.querySelector("#js-user-register__form");
const idInput = idForm.querySelector(".js-user-register__idForm-id");
const idAjaxSend = idForm.querySelector(".id-ajaxsend");
const checkMessageDiv = idForm.querySelector(".check-message");

//pwd check
const pwd = idForm.querySelector(".js-user-register__idForm-pwd");
const pwdConfirm = idForm.querySelector(
  ".js-user-register__idForm-pwd-confirm"
);
const pwdConfirmMessage = idForm.querySelector(".pwdconfirm-message");

// displayname check
const displaynameInput = idForm.querySelector(
  ".js-user-register__idForm-displayname"
);
const displaynameAjaxSend = idForm.querySelector(".displayname-ajaxsend");
const checkDisplaynameMessageDiv = idForm.querySelector(
  ".check-displayname-message"
);

// sign up
const signupButton = idForm.querySelector(".js-signup-button");
const overlapHiddenInput = idForm.querySelector(".js-signup-overlap");

let ID_FLAG = false;
let PWD_FLAG = false;
let DN_FLAG = false;

// console.log(registerForm);
// console.log(idForm);
// console.log(idInput);
// console.log(idAjaxSend);
function reviseIDFlage(count) {
  if (count == 0) {
    ID_FLAG = true;
  } else {
    ID_FLAG = false;
  }
  overlapCheck(ID_FLAG, PWD_FLAG, DN_FLAG);
}
function reviseDISPLAYNAMEFlage(count) {
  if (count == 0) {
    DN_FLAG = true;
  } else {
    DN_FLAG = false;
  }
  overlapCheck(ID_FLAG, PWD_FLAG, DN_FLAG);
}

// id 재입력시 중복체크 메세지 삭제
function handleIdInput() {
  checkMessageDiv.innerHTML = "";
}

// displayname 재입력시 중복체크 메세지 삭제
function handleDisplaynameInput() {
  checkDisplaynameMessageDiv.innerHTML = "";
}

function createMessage(count, type) {
  const message = document.createElement("p");
  if (count != 0) {
    message.innerText = `이미 존재하는 ${type}  입니다.`;
  } else {
    message.innerText = `사용가능한 ${type} 입니다.`;
  }
  return message;
}

// id ajax로 보내기
function sendIDAjax(url, idData) {
  let data = { data: idData, type: "id" };
  data = JSON.stringify(data);

  let oReq = new XMLHttpRequest();
  oReq.open("POST", url);
  oReq.setRequestHeader("Content-Type", "application/json");
  oReq.send(data);
  oReq.addEventListener("load", function() {
    let result = JSON.parse(oReq.responseText);
    // alert(result);
    let count = result.count;
    let msg = createMessage(count, JSON.parse(data).type);
    checkMessageDiv.appendChild(msg);
    reviseIDFlage(count);
  });
}

// id중복체크
function handleIdAjaxSend() {
  let idData = idInput.value;
  // console.log(idData);
  checkMessageDiv.innerHTML = "";
  sendIDAjax("http://localhost:3000/auth/register", idData);
}

//pwd
function createPWDMessage(flag) {
  const message = document.createElement("p");

  if (flag == true) {
    message.innerText = "패스워드가 일치합니다.";
  } else {
    message.innerText = "패스워드가 일치하지않습니다.";
  }

  return message;
}
// pwd 일치 체크
function handlePwdConfirmInput() {
  pwdConfirmMessage.innerHTML = "";
  const pwdData = pwd.value;
  const pwdConfirmData = pwdConfirm.value;
  let flag = false;
  if (pwdData == pwdConfirmData) {
    flag = true;
    PWD_FLAG = true;
  } else {
    flag = false;
    PWD_FLAG = false;
  }
  let msg = createPWDMessage(flag);
  pwdConfirmMessage.appendChild(msg);
  overlapCheck(ID_FLAG, PWD_FLAG, DN_FLAG);
}

// 닉네임(displayname) 중복체크 ajax
function sendDisplaynameAjax(url, displaynameData) {
  let data = { data: displaynameData, type: "displayname" };
  data = JSON.stringify(data);

  let oReq = new XMLHttpRequest();
  oReq.open("POST", url);
  oReq.setRequestHeader("Content-Type", "application/json");
  oReq.send(data);
  oReq.addEventListener("load", function() {
    let result = JSON.parse(oReq.responseText);
    let count = result.count;
    // alert(result.count);
    let msg = createMessage(count, JSON.parse(data).type);
    checkDisplaynameMessageDiv.appendChild(msg);

    reviseDISPLAYNAMEFlage(count);
  });
}

// 닉네임(displayname) 중복체크
function handleDisplaynameAjaxSend() {
  let displaynameData = displaynameInput.value;
  checkDisplaynameMessageDiv.innerHTML = "";
  sendDisplaynameAjax("http://localhost:3000/auth/register", displaynameData);
}

// overlapcheck
function overlapCheck(ID_FLAG, PWD_FLAG, DN_FLAG) {
  if (ID_FLAG == true && PWD_FLAG == true && DN_FLAG == true) {
    overlapHiddenInput.value = 1;
  } else{
    overlapHiddenInput.value = "";
  }
}

// ajax 로 회원가입할 데이터를 보낸다.
function sendRegisterDataAjax(url, registerData) {
  let data = registerData;
  data = JSON.stringify(data);

  let oReq = new XMLHttpRequest();
  oReq.open("POST", url);
  oReq.setRequestHeader("Content-Type", "application/json");
  // console.log(data);
  oReq.send(data);
  oReq.addEventListener("load", function() {
    // alert("회원가입이 완료되었습니다.");
    let result = JSON.parse(oReq.responseText);
    let flag = result.result;
    if(flag == true){
      alert("회원가입 완료.")
      location.href = "http://localhost:3000/";
    }
  });
}

// 회원가입
function signup() {
  const registerData = idForm.getElementsByTagName("input");
  let overlapCheck = registerData.overlapcheck.value;
  // console.log(overlapCheck);
  console.log(ID_FLAG, PWD_FLAG, DN_FLAG);
  let data = {
    id: registerData.id.value,
    pwd: registerData.pwd.value,
    displayName: registerData.displayName.value,
    name: registerData.name.value
  };
  console.log(overlapCheck);
  // console.log(data);
  if (overlapCheck != 1) {
    alert("회원 데이터를 확인해주십시오.");
  } else {
    sendRegisterDataAjax("http://localhost:3000/auth/register_process", data);
  }
}

// init
function init() {
  // const tt = idForm.getElementsByTagName("input");
  // console.log(tt);
  // id
  idAjaxSend.addEventListener("click", handleIdAjaxSend);
  idInput.addEventListener("input", handleIdInput);

  // pwd
  pwdConfirm.addEventListener("input", handlePwdConfirmInput);

  // displayname
  displaynameAjaxSend.addEventListener("click", handleDisplaynameAjaxSend);
  displaynameInput.addEventListener("input", handleDisplaynameInput);

  // sign up
  signupButton.addEventListener("click", signup);
}

init();
