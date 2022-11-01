// Selecionar elementos

const title = document.getElementById("input-title");
const category = document.getElementById("input-category");
const date = document.getElementById("input-date");
const time = document.getElementById("input-time");
const btnSave = document.getElementById("btn-save");
const divImgInitial = document.getElementById("div-img-initial");
const newTaskModal = document.getElementById("newTaskModal");
const body = document.querySelector("body");

//Coleção de dados

const arrTasks =
  localStorage.getItem("todoList") == null
    ? []
    : JSON.parse(localStorage.getItem("todoList"));

// funções - Recuperação dados

btnSave.addEventListener("click", function () {
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
    title.style.boxShadow = "0px 0px 10px var(--actions)";
    date.style.boxShadow = "0px 0px 10px var(--actions)";
    //Retirar os boxShadows e adicionando o focus a partir do click
    title.addEventListener("click", function () {
      title.style.boxShadow = "var(--shadow)";
    });
    date.addEventListener("click", function () {
      date.style.boxShadow = "var(--shadow)";
    });
  }
});

//Salvar no LocalStorage
function updateDB() {
  localStorage.setItem("todoList", JSON.stringify(arrTasks));
}

//Limpar inputs
function clearInputs() {
  title.value = "";
  category.value = "";
  date.value = "";
  time.value = "";
}
