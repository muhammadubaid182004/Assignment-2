let todoArray = [];
let doneArray = [];
let getTodoTask;
let loader; 
let MajorTag = document.getElementById("Main");
let MajorTag2 = document.getElementById("Main2");
let todoLength = document.getElementById("todoLength");
let doneLength = document.getElementById("doneLength");



let onSubmit=()=>{
    let input = document.getElementById("inputTask");
    if(input.value !== ''){
        todoArray.push(input.value);
        input.value = '';let tasksToDo = [];
        let tasksCompleted = [];
        let storedTasksToDo;
        let taskContainer = document.getElementById("Main");
        let completedTaskContainer = document.getElementById("Main2");
        let tasksToDoCount = document.getElementById("todoLength");
        let tasksCompletedCount = document.getElementById("doneLength");
        
        const addTask = () => {
            let taskInput = document.getElementById("inputTask");
            if (taskInput.value !== '') {
                tasksToDo.push(taskInput.value);
                taskInput.value = '';
                storeTasksToDo(tasksToDo);
                renderTasksToDo();
            } else {
                alert("Please enter a task first...");
            }
        }
        
        const storeTasksToDo = (tasks) => {
            let tasksJSON = JSON.stringify(tasks);
            localStorage.setItem("tasksToDo", tasksJSON);
        }
        
        const storeTasksCompleted = (tasks) => {
            let tasksJSON = JSON.stringify(tasks);
            localStorage.setItem("tasksCompleted", tasksJSON);
        }
        
        const renderTasksToDo = () => {
            storedTasksToDo = JSON.parse(localStorage.getItem("tasksToDo"));
            if (storedTasksToDo !== null) {
                tasksToDo = storedTasksToDo;
                taskContainer.innerHTML = "";
                tasksToDoCount.textContent = storedTasksToDo.length;
                storedTasksToDo.forEach((task, index) => {
                    createTaskElement(task, tasksToDo, true);
                });
            }
        }
        
        const renderTasksCompleted = () => {
            let storedTasksCompleted = JSON.parse(localStorage.getItem("tasksCompleted"));
            if (storedTasksCompleted !== null) {
                tasksCompleted = storedTasksCompleted;
                completedTaskContainer.innerHTML = "";
                tasksCompletedCount.textContent = storedTasksCompleted.length;
                storedTasksCompleted.forEach((task, index) => {
                    createTaskElement(task, tasksCompleted, false);
                });
            }
        }
        
        const createTaskElement = (task, taskList, isToDo) => {
            let taskDiv = document.createElement("div");
            let taskParagraph = document.createElement("p");
            let taskActions = document.createElement("div");
            let checkIcon = document.createElement("i");
            let deleteIcon = document.createElement("i");
        
            taskDiv.classList.add("p-3", "pt-4", "mb-2", "d-flex", "justify-content-between", "align-items-center", "fs-5");
            taskDiv.style.color = isToDo ? "#9E78CF" : "#78CFB0";
            taskDiv.style.backgroundColor = "#15101C";
        
            if (!isToDo) {
                taskDiv.classList.add("text-decoration-line-through");
            }
        
            taskParagraph.classList.add("fw-bold");
            taskActions.classList.add("d-flex", "justify-content-around", "gap-4", "fs-4");
            checkIcon.classList.add("fa-solid", "fa-check");
            deleteIcon.classList.add("fa-solid", "fa-trash");
        
            if (isToDo) {
                checkIcon.addEventListener("click", () => {
                    moveToCompletedTasks(task);
                });
            }
        
            deleteIcon.addEventListener("click", () => {
                deleteTask(task, taskList, isToDo);
            });
        
            taskDiv.appendChild(taskParagraph);
            taskDiv.appendChild(taskActions);
        
            taskActions.appendChild(checkIcon);
            taskActions.appendChild(deleteIcon);
        
            taskParagraph.textContent = task;
        
            if (isToDo) {
                taskContainer.appendChild(taskDiv);
            } else {
                completedTaskContainer.appendChild(taskDiv);
            }
        }
        
        const deleteTask = (task, taskList, isToDo) => {
            let updatedTaskList = taskList.filter((currentTask) => currentTask !== task);
            if (isToDo) {
                storeTasksToDo(updatedTaskList);
                renderTasksToDo();
            } else {
                storeTasksCompleted(updatedTaskList);
                renderTasksCompleted();
            }
        }
        
        const moveToCompletedTasks = (task) => {
            tasksCompleted.push(task);
            let updatedTasksToDo = tasksToDo.filter((currentTask) => currentTask !== task);
            storeTasksCompleted(tasksCompleted);
            storeTasksToDo(updatedTasksToDo);
            renderTasksToDo();
            renderTasksCompleted();
        }
        
        renderTasksToDo();
        renderTasksCompleted();
        
        setTodoLocal(todoArray);
        // setDoneLocal(doneArray);
        getTodoLocal()
    }
    else{
        alert("Kindly Enter text first...")
    }
    
}


let setTodoLocal = (list) =>{
    let todoTask = JSON.stringify(list);
    localStorage.setItem("todoTask", todoTask);
}

let setDoneLocal = (list) => {
    let doneTask = JSON.stringify(list);
    localStorage.setItem("doneTask", doneTask)
}

let getTodoLocal = () =>{
    getTodoTask = localStorage.getItem("todoTask");
    getTodoTask = JSON.parse(getTodoTask);
    if(getTodoTask !== null){
        todoArray = getTodoTask;
        MajorTag.innerHTML = "";
        todoLength.textContent = getTodoTask.length;
        getTodoTask.map((v,i)=>{
            createTodoHTML(v, getTodoTask);
        })
    }
}

let getDoneLocal = () =>{
    let getDoneTask = localStorage.getItem("doneTask");
    getDoneTask = JSON.parse(getDoneTask);
    if(getDoneTask !== null){
        doneArray = getDoneTask
        MajorTag2.innerHTML = "";
        doneLength.textContent= getDoneTask.length
        getDoneTask.map((v,i)=>{
            createDoneHTML(v);
        })
    }
}

let createTodoHTML = (data, List) =>{
    let mainTag1 = document.createElement("div");
    let mainPTag = document.createElement("p");
    let mainTag2 = document.createElement("div");
    let iTag1 = document.createElement("i");
    let iTag2 = document.createElement("i");

    mainTag1.classList.add("task-item");

    mainPTag.classList.add("fw-bold");
    mainPTag.textContent = data;
    
    mainTag2.classList.add("task-actions");
    
    iTag1.classList.add("fa-solid", "fa-check");
    iTag2.classList.add("fa-solid", "fa-trash");

    iTag1.addEventListener("click", ()=>{
        moveToDoneTask(data);
    });

    iTag2.addEventListener("click", ()=>{
        Delete(data, List);
    });
    
    mainTag2.appendChild(iTag1);
    mainTag2.appendChild(iTag2);
    
    mainTag1.appendChild(mainPTag);
    mainTag1.appendChild(mainTag2);
    
    MajorTag.appendChild(mainTag1);
};

let createDoneHTML = (data) =>{
    let mainTag1 = document.createElement("div");
    let mainPTag = document.createElement("p");

    mainTag1.classList.add("task-item", "done");

    mainPTag.classList.add("fw-bold");
    mainPTag.textContent = data;
    
    mainTag1.appendChild(mainPTag);
    
    MajorTag2.appendChild(mainTag1);
};


let Delete = (item, list) =>{
    let newList = list.filter((val)=> {
        return val !== item
    })
    setTodoLocal(newList);
    getTodoLocal()
}

let moveToDoneTask = (data) => {
    doneArray.push(data);
    let newList2 = todoArray.filter((val)=> {return val !== data})
    let newList = doneArray
    setDoneLocal(newList);
    setTodoLocal(newList2);
    getTodoLocal();
    getDoneLocal();
}


getTodoLocal()
getDoneLocal()
