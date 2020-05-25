var form = document.querySelector('.form');
var input = document.querySelector('.todo-input');
var ul = document.querySelector('.todo-list');

var todos = [];   
var apiUrl = 'https://jsonplaceholder.typicode.com/todos/'

function addTodo(event) {
    event.preventDefault();
    if(input.value === '') return

    var todoObj = {
        title: input.value,
        completed: false,
    }
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoObj)
        })                            // the status for this request is 200 but the database is not getting update.
    todos = [...todos, todoObj];
    displayTodoList(todos);
    input.value = '';
}


function deleteTodo(e) {
    e.preventDefault()
    if(e.target.className !== "todo-delete-btn") return;

    var id = e.target.id;

    fetch(apiUrl + id, {
        method: 'DELETE'
    })                                   // Similarly it returns a empty obj {} in response. 
    todos.splice(id, 1);
    displayTodoList(todos);
}

function displayTodoList(arr= []) {
    ul.innerHTML = '';
    arr.forEach((arrItem, i) => {
        ul.innerHTML += 
        `<li class='todo-box'>
            <input type="checkbox" class="todo-checkbox" id=${i} ${arrItem.completed ? 'checked' : ""} />
            <label class="todo-item">${arrItem.title}</label>
            <button class='todo-delete-btn' id=${i}>X</button>
        </li>
        `;
    })
}

function getTodoList() {
    fetch(apiUrl + '?_limit=10').then(res => res.json()).then(data => {
        todos = data;
        displayTodoList(todos)
    })
}

function markAsDone(e) {
    if(e.target.className !== 'todo-checkbox') return;
    var id = e.target.id;
    todos[id].completed = !todos[id].completed;
}

ul.addEventListener('click', deleteTodo);
ul.addEventListener('click', markAsDone);
form.addEventListener('submit', addTodo);
window.addEventListener('DOMContentLoaded', getTodoList)
