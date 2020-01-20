const registerForm = document.getElementById("js-user-register");
const idForm = registerForm.querySelector("#js-user-register__form");
const idInput = idForm.querySelector(".js-user-register__idForm-id");
const idAjaxSend = idForm.querySelector(".id-ajaxsend");
const checkMessageDiv = idForm.querySelector(".check-message");

console.log(registerForm);
console.log(idForm);
console.log(idInput);
console.log(idAjaxSend);

function handleIdInput() {
  checkMessageDiv.innerHTML = "";
}

function createMessage(count) {
  const message = document.createElement("p");
  if (count != 0) {
    message.innerText = "이미 존재하는 아이디 입니다.";
  } else {
    message.innerText = "사용가능한 아이디 입니다.";
  }
  return message;
}

function sendAjax(url, idData) {
  let data = { id: idData };
  data = JSON.stringify(data);

  let oReq = new XMLHttpRequest();
  oReq.open("POST", url);
  oReq.setRequestHeader("Content-Type", "application/json");
  oReq.send(data);
  oReq.addEventListener("load", function() {
    let result = JSON.parse(oReq.responseText);
    let count = result.count;
    // alert(result.count);
    let msg = createMessage(count);
    checkMessageDiv.appendChild(msg);
  });
}

function handleIdAjaxSend() {
  let idData = idInput.value;
  // console.log(idData);
  checkMessageDiv.innerHTML = "";
  sendAjax("http://localhost:3000/auth/register", idData);
}

function init() {
  idAjaxSend.addEventListener("click", handleIdAjaxSend);
  idInput.addEventListener("input", handleIdInput);
}


init();