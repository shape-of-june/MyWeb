const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")

function deleteTodo (event) {
    const li = event.target.parentElement;
    li.remove();
}

function flipTodo (event) {
    const span = event.target;
    if (span.innerText == "☐"){
        span.innerText = "☑️";
    } else span.innerText = "☐";
}

function addTodo (newTodo) {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.innerText = "☐";
    button.addEventListener("click", flipTodo);
    li.appendChild(button);

    const span = document.createElement("span");
    span.innerText = newTodo;
    li.appendChild(span);

    const button2 = document.createElement("button");
    button2.innerText = "❌";
    button2.addEventListener("click", deleteTodo);
    li.appendChild(button2);

    todoList.appendChild(li);
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    addTodo(newTodo);
}

todoForm.addEventListener("submit", handleTodoSubmit);