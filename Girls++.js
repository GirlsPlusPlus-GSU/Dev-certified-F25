var taskList = [];

class Task {
    constructor(name, due_date, duration, priority, desc, color){
        // types: string, string DD-MM-YYYY, int, int, string, string in hex format #XXXXXX
    }
}




function onAddTask(){
    //take data and add an object to taskList    
    sortTaskList()
}

function sortTaskList() {

    for (var i = 0; i < taskList.length; i++) {
        var task = taskList[i];


        var dueDate = new Date(task.due_date);
        var today = new Date();
        var daysLate = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
        if (daysLate < 0) daysLate = 0;


        var priorityValue= 1;
        if (task.priority === "medium_priorty") {
            priorityValue= 2;
        } else if (task.priority === "high_priorty") {
            priorityValue= 3;
        }


        var minutes= parseInt(task.duration) || 0;
        task.score= (daysLate * 5) * (priorityValue * 10) * (minutes * 1);
    }


    taskList.sort(function(a, b) {
        return b.score - a.score;
    });


    saveTaskList();
    showTasks();
}


function saveTaskList(){ // fatemeh
    localStorage.setItem("tasks",JSON.stringify(taskList))

}

function loadTaskList(){
    var savedtasks= localStorage.getItem("tasks");
    if (savedtasks) {
        taskList= JSON.parse(savedtasks);
    } else {
        taskList= [];
    }

}

function showTasks() { // fatemeh
    var displayArea = document.querySelector(".task_display");
    displayArea.innerHTML = "";

    for (var i = 0; i < taskList.length; i++) {
        var task = taskList[i];

        var taskDiv = document.createElement("div");
        taskDiv.className = "color-target";
        taskDiv.style.backgroundColor = task.color;

        taskDiv.innerHTML = `
            <table style="width:100%;">
                <tr>
                    <th colspan="3">${task.name}</th>
                    <th></th>
                    <th style="color:rgb(63,62,62);">Completed</th>
                </tr>
                <tr>
                    <td colspan="3">${task.desc}</td>
                    <td></td>
                    <td><input type="checkbox" ${task.completed ? "checked" : ""}></td>
                </tr>
                <tr>
                    <td colspan="3"><p>${task.duration} mins</p></td>
                    <td>Due ${task.due_date}</td>
                    <td>${task.priority}</td>
                </tr>
            </table>
        `;

        displayArea.appendChild(taskDiv);
    }
}


//loadTaskList();
//sortTaskList();