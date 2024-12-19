document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTask = document.getElementById("add-task-btn");
    const list = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("Task")) || [];
    tasks.forEach(task => renderTask(task));

    addTask.addEventListener("click", () => {
        const taskName = todoInput.value.trim();
        if(taskName === "") return;
        const newTask = {
            id: Date.now(),
            text: taskName,
            completed: false
        }
        tasks.push(newTask);
        saveTask();
        renderTask(newTask);
        todoInput.value = "";
        console.log(tasks);  
    })

    function renderTask(task){
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if(task.completed) li.classList.add("completed");
        li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>
        `;
        li.addEventListener("click", (event) => {
            if(event.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTask();  // have to do this even after there was a slight change in the array
        })

        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation(); // this is will stop from event bubbling // event bubbling - when the elements are in the nested from
                                 // the event trigger from the child will also trigger the parent event - to avoid this propogation
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTask();
        })

        list.appendChild(li);
    }
    
    function saveTask(){
        localStorage.setItem("Task", JSON.stringify(tasks));
    }
})