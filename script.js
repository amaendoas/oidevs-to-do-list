// Selecionar elementos

const title = document.getElementById("input-title");
const category = document.getElementById("input-category");
const date = document.getElementById("input-date");
const time = document.getElementById("input-time");
const btnSave = document.getElementById("btn-save");

//Coleção de dados

const arrTasks =
  localStorage.getItem("todoList") == null
    ? []
    : JSON.parse(localStorage.getItem("todoList"));

// funções - recuperação de dados

btnSave.addEventListener("click", function () {
  const task = {
    id: arrTasks.length + 1,
    title: title.value,
    category: category.value,
    date: date.value,
    time: time.value,
  };
  arrTasks.push(task);
  updateDB();
});

//funções - Salvar no LocalStorage
function updateDB() {
  localStorage.setItem("todoList", JSON.stringify(arrTasks));
}

/*
function updateDB() {
    localStorage.setItem('todolist', JSON.stringify(itensDB));
    loadItens();
  }
  
  function loadItens() {
    ul.innerHTML = '';
    itensDB = JSON.parse(localStorage.getItem('todolist')) ?? [];
    itensDB.forEach((item, i) => {
      insertItemTela(item.item, item.status, i);
    });
  } 
  */
