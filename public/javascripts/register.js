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

// console.log(registerForm);
// console.log(idForm);
// console.log(idInput);
// console.log(idAjaxSend);

// id 재입력시 중복체크 메세지 삭제
function handleIdInput() {
  checkMessageDiv.innerHTML = "";
}

// displayname 재입력시 중복체크 메세지 삭제
function handleDisplaynameInput(){
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

function handlePwdConfirmInput() {
  pwdConfirmMessage.innerHTML = "";
  const pwdData = pwd.value;
  const pwdConfirmData = pwdConfirm.value;
  let flag = false;
  if (pwdData == pwdConfirmData) {
    flag = true;
  } else {
    flag = false;
  }
  let msg = createPWDMessage(flag);
  pwdConfirmMessage.appendChild(msg);
}

//
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
  });
}

// 닉네임(displayname) 중복체크
function handleDisplaynameAjaxSend() {
  let displaynameData = displaynameInput.value;
  checkDisplaynameMessageDiv.innerHTML = "";
  sendDisplaynameAjax("http://localhost:3000/auth/register", displaynameData);
}

// init
function init() {
  //id
  idAjaxSend.addEventListener("click", handleIdAjaxSend);
  idInput.addEventListener("input", handleIdInput);

  //pwd
  pwdConfirm.addEventListener("input", handlePwdConfirmInput);

  //displayname
  displaynameAjaxSend.addEventListener("click", handleDisplaynameAjaxSend);
  displaynameInput.addEventListener("input",handleDisplaynameInput)
}

init();
