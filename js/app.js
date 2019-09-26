const styles = require("../css/style.scss");

class Todolist {
    constructor() {
        this.todos = new Map();
        this.initEvents();
    }

    initEvents() {
        const addtodoBtn = document.querySelector(".todo-btn");
        addtodoBtn.addEventListener("click", this.addTodo.bind(this));

        const ul = document.querySelector(".todo-list-ul");
        ul.addEventListener("click", this.doAction.bind(this));
    }

    addTodo() {
        const input = document.querySelector(".todo-input");
        if (!input.value) return;

        let random = 0;
        do {
            random = String(Math.floor(Math.random()*10000));
        } while(this.todos.has(random))

        let todo = new Todo(random, input.value);
        this.addTodoElem(todo);
        this.todos.set(random, todo);
    }

    addTodoElem(todo) {
        const ul = document.querySelector(".todo-list-ul");
        const li = document.createElement("li");
        li.classList.add("todo-list-li");
        li.id = "li-" + todo.id;

        const select = document.createElement("button");
        select.classList.add("todo-li-select");
        select.id = "sl-" + todo.id;

        const span = document.createElement("span");
        span.classList.add("todo-li-span");
        span.innerText = todo.todo;

        const input = document.querySelector(".todo-input");
        input.value = "";

        const remove = document.createElement("button");
        remove.classList.add("todo-li-remove");
        remove.innerText = "X";
        remove.id = "rm-" + todo.id;

        li.append(select);
        li.append(span);
        li.append(remove);
        ul.append(li);
    }

    doAction(event) {
        if (!event.target.id) return;

        const id = event.target.id;
        if (id.substring(0,2) === 'sl') {
            this.toggleComplete(id.substring(3));
        } else this.removeTodo(id.substring(3));
    }

    toggleComplete(id) {
        let todo = this.todos.get(id);
        todo.isComplete = !todo.isComplete;

        const li = document.getElementById("li-" + id);
        const select = li.querySelector(".todo-li-select");
        const span = li.querySelector(".todo-li-span");

        if (todo.isComplete) {
            select.classList.add("complete");
            span.classList.add("complete");
        } else {
            select.classList.remove("complete");
            span.classList.remove("complete");
        }
    }

    removeTodo(id) {
        this.todos.delete(id);
        const li = document.getElementById("li-" + id);
        li.remove();
    }
}

class Todo {
    constructor(id, todo) {
        this.id = id;
        this.todo = todo;
        this.isComplete = false;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let c = new Todolist();
});