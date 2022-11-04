// Selecionar elementosAddTask
const title = document.getElementById('input-title')
const category = document.getElementById('input-category')
const date = document.getElementById('input-date')
const time = document.getElementById('input-time')
const btnSave = document.getElementById('btn-save')
const btnCloseModal = document.getElementById('btn-close-modal')
const newTaskModal = document.getElementById('new-task-modal')
const initialImg = document.getElementById('div-img-initial')
const taskList = document.getElementById('task-list')
const btnDelTaskInModal = document.getElementById('btn-del-task')
const btnTrash = document.getElementById('btn-delete')
const alertDiv = document.getElementById('alert-div')
const alertMsg = document.getElementById('alert-msg')
const alertCloseBtn = document.getElementById('alert-close-btn')
const titleEdit = document.getElementById('input-edit-title')
const categoryEdit = document.getElementById('input-edit-category')
const dateEdit = document.getElementById('input-edit-date')
const timeEdit = document.getElementById('input-edit-time')
const btnSaveEdit = document.getElementById('btn-edit-save')

let taskId;
let taskIndex;
let currentId = getLocalStorage('idDB') == null ? 0 : getLocalStorage('idDB')

const listOfTasks =
  getLocalStorage('todoList') == null ? [] : getLocalStorage('todoList')

if (listOfTasks.length === 0) showInitialImg()

loadTasks()

//adiciona no LocalStorage
function setLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}

//resgatar no LocalStorage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

//limpar os inputs
function cleanInputs() {
  title.value = ''
  category.value = ''
  date.value = ''
  time.value = ''
}

//fazer o update do localStorage
function updateDB() {
  setLocalStorage('todoList', listOfTasks)
  if (listOfTasks.length === 0) showInitialImg()
  loadTasks()
}

//adiciona o id no localStorage
function addCurrentId() {
  currentId++
  setLocalStorage('idDB', currentId)
}

//adiciona o array no LocalStorage
function addTaskDB() {
  addCurrentId()
  const task = {
    id: currentId,
    title: title.value,
    category: category.value ? category.value : 'Geral',
    date: date.value,
    time: time.value ? time.value : 'Dia todo',
    status: ''
  }
  listOfTasks.push(task)
  sortListByDate()
  updateDB()
}

//adicionar o focus padrão a partir do click
function focusOnClick() {
  title.addEventListener('click', function () {
    title.classList.remove('input-error')
  })
  date.addEventListener('click', function () {
    date.classList.remove('input-error')
  })
}

// quando clicar no botão save do modal fazer as verificações e salvar no local storage
btnSave.addEventListener('click', function () {
  const hasTitle = title.value != ''
  const hasDate = date.value != ''
  if (hasTitle && hasDate) {
    addTaskDB()
    cleanInputs()
    showAlert('Tarefa adicionada com sucesso!')
  } else {
    if (!hasTitle) title.classList.add('input-error')
    if (!hasDate) date.classList.add('input-error')
    focusOnClick()
  }
})

//recuperação de styles default dos inputs obrigatórios
function recoverStyles() {
  title.classList.remove('input-error')
  date.classList.remove('input-error')
}

// Ação do botão de fechar do modal tasks
btnCloseModal.addEventListener('click', function () {
  cleanInputs()
  recoverStyles()
})
//Ivina

// Natasha
// Função que ordena a array por data
function sortListByDate() {
  listOfTasks.sort((task1, task2) => {
    let date1
    let date2

    if (task1.time !== 'Dia todo') {
      date1 = new Date(`${task1.date} ${task1.time}`)
    } else {
      date1 = new Date(`${task1.date} 00:00`)
    }

    if (task2.time !== 'Dia todo') {
      date2 = new Date(`${task2.date} ${task2.time}`)
    } else {
      date2 = new Date(`${task2.date} 00:00`)
    }

    return date1.getTime() - date2.getTime()
  })
}

// Natasha
// Mostra a imagem inicial na tela
function showInitialImg() {
  let div = document.getElementById('div-content')
  div.innerHTML = `
    <div class="col mx-auto text-center align-self-center" id="div-img-initial">
      <img src="./img/todo-list.svg" alt="img-todo-list" class="img-todo-list" />
      <h5>Sua Lista de tarefas está vazia</h5>
    </div>
  `
}

// Natasha
// Carregar os elementos das tarefas e insere na tela
function loadTasks() {
  taskList.innerHTML = ''
  listOfTasks.forEach((item, index) => {
    createTasksCards(
      item.id,
      item.title,
      item.category,
      item.date,
      item.time,
      item.status,
      index
    )
  })
}

// Carol
// Cria os cartões da lista de tarefas
function createTasksCards(id, title, category, date, time, status, index) {
  let li = document.createElement('li')
  li.classList.add('taskList-card')
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
      <button class="btnAction" id="btn-delete" data-bs-toggle="modal" data-bs-target="#deleteTaskModal" onclick="getTaskId(${id})">
        <i class="bi bi-trash"></i>
      </button>
    </div>
    `
  taskList.appendChild(li)
}

// Carol
function done(checkbox, index) {
  if (checkbox.checked) {
    listOfTasks[index].status = 'checked'
  } else {
    listOfTasks[index].status = ''
  }
  updateDB()
}

// Vitória
// Passa o valor do parâmetro para o taskId
function getTaskId(parTaskId) {
  taskId = parTaskId
}
// Procura qual task tem o mesmo id na lista de tarefas e retorna um array de objeto
function getTask() {
  return listOfTasks.filter(task => task.id === taskId)
}

// Pega o índice da tarefa que está sendo clicada
function indexOfTask(task) {
  return listOfTasks.indexOf(task)
}
// Amanda
// Passa os valores do localStorage pros inputs da modal de editar
function editTask(parTaskId) {
  getTaskId(parTaskId)
  let [taskToEdit] = getTask()
  taskIndex = indexOfTask(taskToEdit)
  titleEdit.value = taskToEdit.title
  categoryEdit.value = taskToEdit.category
  dateEdit.value = taskToEdit.date
  timeEdit.value = taskToEdit.time
}


//Amanda
//salva a task editada no local storage
function saveEdit(parTaskId) {
  const editedTask = {
    id: parTaskId,
    title: titleEdit.value,
    category: categoryEdit.value ? categoryEdit.value : 'Geral',
    date: dateEdit.value,
    time: timeEdit.value ? timeEdit.value : 'Dia todo',
    status: ''
  }
  listOfTasks.splice(taskIndex, 1, editedTask)
  sortListByDate(listOfTasks)
  updateDB()
  showAlert('Tarefa atualizada com sucesso!')
}

//Amanda
// Ao clicar no botão salvar registra os dados da task pelo ID
btnSaveEdit.addEventListener('click', () => {
  saveEdit(taskId)
})

// Vitória 
// Remove a tarefa a partir do id
function removeTask() {
  let [taskToDeleteList] = getTask()
  let indexTaskToDelete = indexOfTask(taskToDeleteList)
  listOfTasks.splice(indexTaskToDelete, 1)
  updateDB()
  showAlert('Tarefa excluída com sucesso!')
}

// Vitória
btnDelTaskInModal.addEventListener('click', () => removeTask())

newTaskModal.addEventListener('hidden.bs.modal', () => {
  location.reload()
})

// Amanda
alertCloseBtn.addEventListener('click', hideAlert)

function showAlert(msg) {
  alertDiv.classList.add('show')
  alertDiv.classList.add('showAlert')
  alertDiv.classList.remove('hide')
  setTimeout(hideAlert, 5000)
  alertMsg.innerHTML = msg
}

function hideAlert() {
  alertDiv.classList.add('hide')
  alertDiv.classList.remove('show')
}

// // Natasha
// // Função que ordena a array por data
// function sortListByDate() {
//   listOfTasks.sort((task1, task2) => {
//     let date1
//     let date2

//     if (task1.time !== 'Dia todo') {
//       date1 = new Date(`${task1.date} ${task1.time}`)
//     } else {
//       date1 = new Date(`${task1.date} 00:00`)
//     }

//     if (task2.time !== 'Dia todo') {
//       date2 = new Date(`${task2.date} ${task2.time}`)
//     } else {
//       date2 = new Date(`${task2.date} 00:00`)
//     }

//     return date1.getTime() - date2.getTime()
//   })
// }
