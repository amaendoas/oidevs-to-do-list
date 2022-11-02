// Selecionar elementos

const title = document.getElementById("input-title");
const category = document.getElementById("input-category");
const date = document.getElementById("input-date");
const time = document.getElementById("input-time");
const btnSave = document.getElementById("btn-save");
const btnCloseModal = document.getElementById("btn-close-modal");
const divInitialImg = document.getElementById("div-img-initial");
const newTaskModal = document.getElementById("new-task-modal");
const initialImg = document.getElementById("div-img-initial"); // ADICIONADO POR NATASHA
const taskList = document.getElementById("task-list");
//adicionado por amanda
const alertDiv = document.getElementById("alert-div");
const alertMsg = document.getElementById("alert-msg");
const alertCloseBtn = document.getElementById("alert-close-btn")

alertContent(btnSave, "Tarefa adicionada com sucesso!")
//Coleção de dados

const arrTasks =
  localStorage.getItem("todoList") == null
    ? []
    : JSON.parse(localStorage.getItem("todoList"));

// const arrTasks = [];
if (arrTasks.length === 0) showInitialImg(arrTasks);

// funções - Recuperação dados

btnSave.addEventListener("click", function () {
  const hasTitle = title.value != "";
  const hasDate = date.value != "";

  if (hasTitle && hasDate) {
    addTaskDB();

    //limpar os campos digitados
    cleanInputs();
    alert("Tarefa adicionada com sucesso");
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
});

function addTaskDB() {
  const task = {
    id: arrTasks.length + 1,
    title: title.value,
    category: category.value,
    date: date.value,
    time: time.value,
  };
  //Salvar os dados na array de objetos e localStorage
  arrTasks.push(task);
  // Fazer o sort ou filter
  updateDB(arrTasks);
}

//Salvar no LocalStorage
function updateDB(arrTasks) {
  localStorage.setItem("todoList", JSON.stringify(arrTasks));
  if (arrTasks.length === 0) showInitialImg(arrTasks);
  console.log(arrTasks.length);
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
  location.reload();
});

/*alerta - AMANDA */

alertCloseBtn.addEventListener("click", hideAlert)

function alertContent(btn, msg) {
  showAlert(btn)
  setAlertMsg(msg)
}

function showAlert(btn) {
  btn.addEventListener("click", () => {
    alertDiv.classList.add("show")
    alertDiv.classList.add("showAlert")
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

// ADICIONADO POR NATASHA

function hideInitialImg() {
  let div = document.getElementById('div-content');
    div.innerHTML = "";
  // console.log(initialImg);
  // initialImg.in = "";
  // initialImg.parentNode.removeChild(initialImg);
  // location.reload();
}


function showInitialImg(arrTasks) {
  if (arrTasks.length === 0) {
    let div = document.getElementById('div-content');
    div.innerHTML = `
      <div class="col mx-auto text-center" id="div-img-initial">
        <img src="./img/todo-list.svg" alt="img-todo-list" class="img-todo-list" />
        <h5>Sua Lista de tarefas está vazia</h5>
      </div>
    `;
  }
}

// function loadTasks() {
//   taskList.innerHTML = "";
//   arrTasks = JSON.parse(localStorage.getItem("todoList")) ?? [];
//   arrTasks.forEach(item => {
//     insertItemTela(item.id, item.title, item.category, item.date, item.time)
//   });
// }

// function insertItemTela(id, title, category, date, time) {
//   const li = document.createElement("li");
//   li.classList.add("taskList-card");
//   li.innerHTML = `
//     <div class="task-info-container">
//       <div class="task-info">
//         <label class="checkbox-container">
//           <input type="checkbox"/>
//           <span class="checkmark"></span>
//         </label>
//       <h5 ${title}></h5>
//       </div>
//       <div class="task-details">
//         <span class="category" ${category}></span>
//         <aside>
//           <i class="bi bi-calendar-week"></i>
//           <date class="date">${date}</date>
//           <i class="bi bi-clock"></i>
//           <time class="time">${time}</time>
//         </aside>
//       </div>
//     </div>

//     <div class="task-btnAction">
//       <button class="btnAction">
//         <i class="bi bi-pencil"></i>
//       </button>
//       <button class="btnAction" id="btn-delete" data-bs-toggle="modal" data-bs-target="#deleteTaskModal" onclick="deleteTask(${id})">
//         <i class="bi bi-trash"></i>
//       </button>
//     </div>
//     `
//   taskList.appendChild(li);
// }
