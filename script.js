// Selecionar elementos
const title = document.getElementById("input-title");
const category = document.getElementById("input-category");
const date = document.getElementById("input-date");
const time = document.getElementById("input-time");
const btnSave = document.getElementById("btn-save");
const btnCloseModal = document.getElementById("btn-close-modal");
const divInitialImg = document.getElementById("div-img-initial");
const newTaskModal = document.getElementById("new-task-modal");
const btnAddTask = document.getElementById("btn-add-task");
const initialImg = document.getElementById("div-img-initial");
const taskList = document.getElementById("task-list");
// const btnDeleteModal = document.getElementById("btn-del-task");
// const btnTrash = document.getElementById("btn-delete");
//adicionado por amanda
const alertDiv = document.getElementById("alert-div");
const alertMsg = document.getElementById("alert-msg");
const alertCloseBtn = document.getElementById("alert-close-btn");

//Coleção de dados

// const listOfTasks = [];

let listOfTasks =
  JSON.parse(localStorage.getItem("todoList")) == null
    ? []
    : JSON.parse(localStorage.getItem("todoList"));

// const listOfTasks = [];
if (listOfTasks.length === 0) showInitialImg(listOfTasks);

// funções - Recuperação dados

btnSave.addEventListener("click", function () {
  const hasTitle = title.value != "";
  const hasDate = date.value != "";

  if (hasTitle && hasDate) {
    addTaskDB();

    //limpar os campos digitados
    cleanInputs();
    showAlert("Tarefa adicionada com sucesso!");
  } else {
    if (!hasTitle) title.classList.add("input-error");

    if (!hasDate) date.classList.add("input-error");

    //Retirar os boxShadows e adicionando o focus a partir do click
    title.addEventListener("click", function () {
      title.classList.remove("input-error");
    });
    date.addEventListener("click", function () {
      date.classList.remove("input-error");
    });
  }
  hideInitialImg();
  loadTasks();
});

function addTaskDB() {
  const task = {
    id: listOfTasks.length + 1,
    title: title.value,
    category: category.value ? category.value : "Geral",
    date: date.value,
    time: time.value ? time.value : "Dia todo",
    status: "",
  };
  //Salvar os dados na array de objetos e localStorage
  listOfTasks.push(task);
  // Fazer o sort ou filter
  updateDB(listOfTasks);
}

//Salvar no LocalStorage
function updateDB(listOfTasks) {
  localStorage.setItem("todoList", JSON.stringify(listOfTasks));
  if (listOfTasks.length === 0) showInitialImg(listOfTasks);
  loadTasks();
}

//Limpar inputs (formato default)
function cleanInputs() {
  title.value = "";
  category.value = "";
  date.value = "";
  time.value = "";
}
// Ação do botão de fechar do modal tasks
btnCloseModal.addEventListener("click", function () {
  //limpeza dos values dos inputs
  cleanInputs();
  //recuperação de styles default dos inputs obrigatórios
  title.classList.remove("input-error");
  date.classList.remove("input-error");
});

// ADICIONADO POR NATASHA

function hideInitialImg() {
  let div = document.getElementById("div-content");
  div.innerHTML = "";
}

function showInitialImg(listOfTasks) {
  if (listOfTasks.length === 0) {
    let div = document.getElementById("div-content");
    div.innerHTML = `
      <div class="col mx-auto text-center" id="div-img-initial">
        <img src="./img/todo-list.svg" alt="img-todo-list" class="img-todo-list" />
        <h5>Sua Lista de tarefas está vazia</h5>
      </div>
    `;
  }
}
function loadTasks() {
  taskList.innerHTML = "";
  listOfTasks = JSON.parse(localStorage.getItem("todoList")) ?? [];
  listOfTasks.forEach((item, index) => {
    insertItemTela(
      item.id,
      item.title,
      item.category,
      item.date,
      item.time,
      item.status,
      index
    );
  });
}

function insertItemTela(id, title, category, date, time, status, index) {
  let li = document.createElement("li");
  li.classList.add("taskList-card");
  li.innerHTML = `
    <div class="task-info-container">
      <div class="task-info">
        <label class="checkbox-container">
          <input type="checkbox" ${status} onchange="done(this, ${index});"/>
          <span class="checkmark"></span>
        </label>
      <h5>${title}</h5>
      </div>
      <div class="task-details">
        <span class="category">${category}</span>
        <aside>
          <i class="bi bi-calendar-week"></i>
          <date class="date">${date}</date>
          <i class="bi bi-clock"></i>
          <time class="time">${time}</time>
        </aside>
      </div>
    </div>

    <div class="task-btnAction">
      <button class="btnAction" id="btn-edit" data-bs-toggle="modal" data-bs-target="#editTaskModal" onclick="editTask(${id})">
        <i class="bi bi-pencil"></i>
      </button>
      <button class="btnAction" id="btn-delete" data-bs-toggle="modal" data-bs-target="#deleteTaskModal" onclick="removeItemTasks(${id})">
        <i class="bi bi-trash"></i>
      </button>
    </div>
    `;
  taskList.appendChild(li);
}

function editTask() {}

// btnTrash.addEventListener("click", function () {
//   let modalConfirmDelete = getElementById("modal-delete-task");
//   modalConfirmDelete.innerHTML = `<div class="modal " tabindex="-1" id="modal-delete-task">
//     <div class="modal-dialog modal-dialog-centered">
//       <div class="modal-content">
//         <div class="modal-header">
//           <div class="img-alert-center">
//             <img src="./img/img-alert.svg" alt="alert-image" class="alert-image">
//           </div>
//           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         </div>
//         <div class="modal-body">
//           <h6>Tem certeza deseja excluir essa tarefa?</h6>
//         </div>
//         <div class="modal-footer">
//           <button type="button" class="btn btn-default" id="btn-del-task">
//             Excluir
//           </button>
//           <button type="button" class="btn btn-cancel">Cancelar</button>
//         </div>
//       </div>
//     </div>
//   </div>`;
// });

function removeItemTasks(taskid) { 
  let taskToDeleteList = listOfTasks.filter((task) => task.id === taskid);
  let taskToDeleteObject = taskToDeleteList[0];
  let indexTaskToDelete = listOfTasks.indexOf(taskToDeleteObject);
  listOfTasks.splice(indexTaskToDelete, 1);
  updateDB(listOfTasks);
}

newTaskModal.addEventListener("hidden.bs.modal", (event) => {
  location.reload();
});
loadTasks();

function done(checkbox, index) {
  if (checkbox.checked) {
    listOfTasks[index].status = "checked";
  } else {
    listOfTasks[index].status = "";
  }
  updateDB(listOfTasks);
}

/*alerta - AMANDA */

alertCloseBtn.addEventListener("click", hideAlert);

function showAlert(msg) {
  alertDiv.classList.add("show");
  alertDiv.classList.add("showAlert");
  alertDiv.classList.remove("hide");
  setTimeout(hideAlert, 5000);
  alertMsg.innerHTML = msg;
}

function hideAlert() {
  alertDiv.classList.add("hide");
  alertDiv.classList.remove("show");
}
