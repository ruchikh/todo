console.log('start todo');
var form = document.querySelector('.form');
var input = document.querySelector('.todo-input');
var ul = document.querySelector('.todo-list');
var apiUrl = 'https://jsonplaceholder.typicode.com/todos/'

function addTodo(event) {
    event.preventDefault()
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: input.value,
            completed: false,
        })
    })
        .then(resp => resp.json())
        .then(todoLists)
    input.value = '';
}

function todoLists(todo) {
    console.log(todo, 'todo');
    ul.innerHTML += `<li>
            <input type="checkbox"/>
            <span>${todo.title}</span>
            <button class='btn' id=${todo.id}>X</button>
        </li>
        `;
    // var l = document.createElement("li")
    // var span = document.createElement("span")
    // // span.setAttribute("contenteditable", true)
    // // span.setAttribute("data-id", todo.id)
    // span.innerHTML = todo.title;
    // // span.addEventListener("blur", update)
    // l.appendChild(span)
    // var input = document.createElement("input")
    // var a = document.createElement("a")
    // a.innerHTML = '&times;'
    // a.addEventListener("click", deleteTodo)
    // a.setAttribute("data-id", todo.id)
    // input.setAttribute("type", 'checkbox')
    // l.prepend(input)
    // l.appendChild(a)
    // ul.appendChild(l)
}


function deleteTodo(e) {
    e.preventDefault()
    var id = e.target.id;
    let delButtonIsPressed = event.target.className === "btn"
    console.log(delButtonIsPressed, id, 'delButtonIsPressed')
    console.log(apiUrl + id)
    if (delButtonIsPressed) {
        fetch(apiUrl + id, {
            method: 'DELETE'
        }).then(resp => resp.json()).then(getTodoList)
    }
}

function getTodoList() {
    fetch(apiUrl + '?_limit=10').then(res => res.json()).then(lists =>
        lists.forEach(todoLists)
    )
}


ul.addEventListener('click', deleteTodo)
form.addEventListener('submit', addTodo)