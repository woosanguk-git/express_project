const notebook = document.getElementById("js-notebook");
const newNoteButton = document.getElementById("js-notebook__new");
const editNotebookButton = document.getElementById("js-notebook__notebook-edit")

function addForm() {
  const form = document.createElement("form");
  form.setAttribute("charset", "UTF-8");
  form.setAttribute("method", "Post"); //Post 방식
  form.setAttribute("action", "/board/createNotebook_process");
  form.setAttribute("id","js-notebook__form")
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
function handleClick(event) {

  // 이벤트 리스너 제거
  newNoteButton.removeEventListener("click", handleClick);
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
function handleEditNotebookButton(){
  
}


function init() {
  newNoteButton.addEventListener("click", handleClick);
  editNotebookButton.addEventListener("click", handleEditNotebookButton)
}

init();
