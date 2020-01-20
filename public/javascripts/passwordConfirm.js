const registerForm = document.getElementById("js-user-register");
const idForm = registerForm.querySelector("#js-user-register__form");
const pwd = idForm.querySelector(".js-user-register__idForm-pwd");
const pwdConfirm = idForm.querySelector(".js-user-register__idForm-pwd-confirm");


const pwdData = new Object();

function handlePwdInput(){
    
}

function init(){
    pwd.addEventListener("input", handlePwdInput);
    pwdConfirm.addEventListener("input",handlePwdConfirmInput);
}

init()