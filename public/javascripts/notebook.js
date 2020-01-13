// const notebook = document.getElementById("js-control-buttons");
const notebook = document.getElementById("js-notebooks__control-buttons");
const newNoteButton = document.getElementById("js-control-buttons__new");
const editNotebookButton = document.getElementById("js-control-buttons__edit");
const notebooks = document.querySelectorAll(".notebook-column");
console.log(notebooks);

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
  deleteButton.addEventListener("click", handleClickDeleteBUtton);
  // X 버튼에 id 추가
  deleteButton.setAttribute("id", "js-deleteButton");

  form.appendChild(input);
  form.appendChild(submit);
  form.appendChild(deleteButton);

  notebook.appendChild(form);
}
function handleNewNotebookButton(event) {
  // 이벤트 리스너 제거
  newNoteButton.removeEventListener("click", handleNewNotebookButton);
  addForm();
}

function handleClickDeleteBUtton(event) {
  if (event) {
    const form = notebook.querySelector("#js-notebook__form");
    this.removeEventListener("click", handleClickDeleteBUtton);
    notebook.removeChild(form);
  }
  init();
}

// Edit
function handleEditNotebookButton() {
  notebookEditForm();
  addCancelButton();
}

function addCancelButton(){
  let editCancelButton = document.createElement("button");

  editCancelButton.innerText = "X";
  notebook.appendChild(editCancelButton);
}

function notebookEditForm() {
  for (let index = 0; index < notebooks.length; index++) {
    let deleteLink = document.createElement("a");
    let modifyButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    deleteLink.setAttribute("href", "/test");

    modifyButton.innerText = "수정";
    deleteButton.innerText = "삭제";

    deleteLink.appendChild(deleteButton);
    notebooks[index].appendChild(modifyButton);
    notebooks[index].appendChild(deleteLink);
    // console.log(index, notebooks[index]);
  }
}

function init() {
  newNoteButton.addEventListener("click", handleNewNotebookButton);
  editNotebookButton.addEventListener("click", handleEditNotebookButton);
}

init();
