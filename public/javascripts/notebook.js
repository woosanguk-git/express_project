// const notebook = document.getElementById("js-control-buttons");
const notebook = document.getElementById("js-notebooks__control-buttons");
const newNoteButton = document.getElementById("js-control-buttons__new");
const editNotebookButton = document.getElementById("js-control-buttons__edit");
const notebooks = document.querySelectorAll(".js-notebook-column");
// console.log(newNoteButton.textContent);

// 노트북 생성폼 추가
function addForm() {
  const form = document.createElement("form");
  form.setAttribute("charset", "UTF-8");
  form.setAttribute("method", "Post"); //Post 방식
  form.setAttribute("action", "/board/createnotebook-process");
  form.setAttribute("id", "js-notebook__form");
  // html 엘리먼트 생성
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "notebookName");
  input.setAttribute("placeholder", "New book name.");

  const submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "추가");

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  // x 버튼 이벤트리스너 추가
  deleteButton.addEventListener("click", handleClickDeleteButton);
  // X 버튼에 id 추가
  deleteButton.setAttribute("id", "js-deleteButton");

  form.appendChild(input);
  form.appendChild(submit);
  form.appendChild(deleteButton);

  notebook.appendChild(form);
}

// 추가 버턴 누르면 폼 생성
function handleNewNotebookButton(event) {
  // 이벤트 리스너 제거
  newNoteButton.removeEventListener("click", handleNewNotebookButton);
  addForm();
}

// x버튼 눌렀을 때
function handleClickDeleteButton(event) {
  if (event) {
    const form = notebook.querySelector("#js-notebook__form");
    this.removeEventListener("click", handleClickDeleteButton);
    notebook.removeChild(form);
  }
  init();
}

// Edit
function handleEditNotebookButton() {
  notebookEditForm();
  addCancelButton();
}

// 노트북 이름 수정에서 x버튼이 눌렸을 때
function handleBooknameModifyCancelButton(event) {
  // console.log(event);
  let tobeDeleteElement = event.toElement.parentElement;
  let parentElement = event.path[2];

  // console.log(parentElement); // 얘를 부모 태그에서부터 지우면된다.

  this.removeEventListener("click", handleBooknameModifyCancelButton);
  parentElement.removeChild(tobeDeleteElement);
}

// x버튼이 눌렸을 때
function handleEditCancelButton() {
  for (let index = 0; index < notebooks.length; index++) {
    let deleteLink = notebooks[index].querySelector(
      ".notebook-column__delete-link"
    );
    let modifyButton = notebooks[index].querySelector("button");
    // 노트북이름 수정 폼
    let notebookModifyForm = notebooks[index].querySelector(".js-notebook-modify__form")


    notebooks[index].removeChild(deleteLink);
    notebooks[index].removeChild(modifyButton);
    if(notebookModifyForm){
      notebooks[index].removeChild(notebookModifyForm);
    }
  }
  let editCancelButton = document.getElementById(
    "js-control-buttons__edit-cancel"
  );
  editCancelButton.removeEventListener("click", handleEditCancelButton);
  notebook.removeChild(editCancelButton);
}

// Edit 버튼을 누르면 취소할 수 있는 x버튼 추가.
function addCancelButton() {
  let editCancelButton = document.createElement("button");

  editCancelButton.innerText = "X";
  editCancelButton.setAttribute("id", "js-control-buttons__edit-cancel");
  notebook.appendChild(editCancelButton);

  editCancelButton.addEventListener("click", handleEditCancelButton);
}

// 수정버튼이 눌렸을 때
function handleNotebookModifyButton(event) {
  let parentElement = event.toElement.parentElement;
  let previousElement = event.toElement.previousElementSibling;
  let bookName = previousElement.textContent;
  let notebookURL = previousElement.getAttribute("href");

  const div = document.createElement("div");
  div.setAttribute("class", "js-notebook-modify__form");

  const form = document.createElement("form");
  form.setAttribute("charset", "UTF-8");
  form.setAttribute("method", "Post"); //Post 방식
  form.setAttribute("action", `${notebookURL}/modify-process`);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "notebookName");
  input.setAttribute("placeholder", bookName);

  const submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Rename");

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("type", "button");
  cancelButton.innerText = "X";

  // cancelButton 이벤트 리스터 추가.
  cancelButton.addEventListener("click", handleBooknameModifyCancelButton);

  form.appendChild(input);
  form.appendChild(submit);
  div.appendChild(form);
  div.appendChild(cancelButton);
  parentElement.appendChild(div);

  // console.log(notebookURL);
  // console.log(bookName);
  // console.log(event.toElement.previousElementSibling);
  // console.log(event);
}
// Edit 버튼 눌렀을 때
function notebookEditForm() {
  for (let index = 0; index < notebooks.length; index++) {
    let deleteLink = document.createElement("a");
    let modifyButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    let bookName = notebooks[index].querySelector(
      ".js-notebook-column__bookname"
    ).textContent;
    let bookNameURL = notebooks[index]
      .querySelector(".js-notebook-column__bookname")
      .getAttribute("href");

    // 엘리먼트 속성 설정.
    deleteLink.setAttribute("href", `${bookNameURL}/delete-process`);
    deleteLink.setAttribute("class", "notebook-column__delete-link");
    modifyButton.setAttribute("type", "button");

    modifyButton.addEventListener("click", handleNotebookModifyButton);

    modifyButton.innerText = "수정";
    deleteButton.innerText = "삭제";

    deleteLink.appendChild(deleteButton);
    notebooks[index].appendChild(modifyButton);
    notebooks[index].appendChild(deleteLink);
    // console.log(index, notebooks[index]);
    // console.log("값 가져오기 테스트", notebooks[index].textContent);
    // console.log(notebooks[index].getElementsByClassName("js-notebook-column__bookname"));
    // console.log(notebooks[index].querySelector(".js-notebook-column__bookname").textContent);
    // 값 가져오는거 까지 성공
  }
}

function init() {
  newNoteButton.addEventListener("click", handleNewNotebookButton);
  editNotebookButton.addEventListener("click", handleEditNotebookButton);
}

init();
