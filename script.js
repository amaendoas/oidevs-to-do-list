// Selecionar elementos

const title = document.getElementById("input-title");
const category = document.getElementById("input-category");
const date = document.getElementById("input-date");
const time = document.getElementById("input-time");
const btnSave = document.getElementById("btn-save");
const btnCloseModal = document.getElementById("btn-close-modal");
const divImgInitial = document.getElementById("div-img-initial");
const newTaskModal = document.getElementById("newTaskModal");
const alertDiv = document.getElementById("alert-div");
const alertMsg = document.getElementById("alert-msg");
const alertCloseBtn = document.getElementById("alert-close-btn")

const body = document.querySelector("body");

//Coleção de dados

const arrTasks =
  localStorage.getItem("todoList") == null
    ? []
    : JSON.parse(localStorage.getItem("todoList"));

// funções - Recuperação dados

btnSave.addEventListener("click", function () {
  const hasTitle = title.value != "";
  const hasDate = date.value != "";

  if (!hasTitle) {
    title.classList.add("input-error");
  }

  if (!hasDate) {
    date.classList.add("input-error");
  }

  if (title.value != "" && date.value != "") {
    const task = {
      id: arrTasks.length + 1,
      title: title.value,
      category: category.value,
      date: date.value,
      time: time.value,
    };
    //Salvar os dados na array de objetos e localStorage
    arrTasks.push(task);
    updateDB();
    //limpar os campos digitados
    clearInputs();
    alert("Tarefa adicionada com sucesso");
  } else {
    //Retirar os boxShadows e adicionando o focus a partir do click
    title.addEventListener("click", function () {
      title.classList.remove("input-error");
    });
    date.addEventListener("click", function () {
      date.classList.remove("input-error");
    });
  }
});

//Salvar no LocalStorage
function updateDB() {
  localStorage.setItem("todoList", JSON.stringify(arrTasks));
}

//Limpar inputs (formato default)
function clearInputs() {
  title.value = "";
  category.value = "";
  date.value = "";
  time.value = "";
}

btnCloseModal.addEventListener("click", function () {
  //limpeza dos values dos inputs
  clearInputs();
  //recuperação de styles default dos inputs obrigatórios
  title.classList.remove("input-error");
  date.classList.remove("input-error");
});

console.log(arrTasks);

/*alerta - AMANDA */

alertCloseBtn.addEventListener("click", hideAlert)

function alertContent(btn, msg) {
  showAlert(btn)
  setAlertMsg(msg)
}

function showAlert(btn) {
  btn.addEventListener("click", () => {
    alertDiv.classList.add("show")
    alertDiv.classList.remove("hide")
    setTimeout(hideAlert, 5000)
  })
}

function setAlertMsg(msg) {
  alertMsg.innerHTML = msg
}

function hideAlert() {
  alertDiv.classList.add("hide")
  alertDiv.classList.remove("show")
}