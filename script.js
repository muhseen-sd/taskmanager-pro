const form = document.querySelector("form")
const taskInput = document.querySelector("#task-title-input")
const prioritySelect = document.querySelector("#task-priority-select")
const pendingTask = document.querySelector("#pending-tasks-container")
const completedTask = document.querySelector("#completed-tasks-container")

// Starting dataset array 

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [
    { id: 1, title: "Review InsightFilter deployment strategy", priority: "High", status: "Pending" },
    { id: 2, title: "Optimize CSS Grid breakpoints", priority: "Medium", status: "Completed" },
];

/* Writing a function that loops through the tasks array, builds the HTML string for each card, 
and injects them into the correct container based on whether their status is "Pending" or "Completed" */

function renderTasks(){
    // Clear the task section first to follow the logic.
    pendingTask.innerHTML = "";
    completedTask.innerHTML = "";

    tasks.forEach( (task) => {
        if (task.status === "Pending"){
            let pendingCard = ` 
                <div class="task-card" data-id="${task.id}">
                    <h3>${task.title}</h3>
                    <!--     <span>${task.priority}</span> -->
                    <span class="priority-badge ${task.priority.toLowerCase()}">${task.priority}</span>
                    <div class="actions">
                        <button class="complete-btn">✔️ &nbsp &nbsp &nbsp Complete</button>
                        <button class="delete-btn">❌</button>
                    </div>
                </div>
            `;
            pendingTask.innerHTML += pendingCard
            
        }

        else{
            let completedCard = `
                <div class="task-card" data-id="${task.id}">
                    <h3>${task.title}</h3>
                    <!-- <span>${task.priority}</span>   -->
                    <span class="priority-badge ${task.priority.toLowerCase()}">${task.priority}</span>
                    <div class="actions">
                        <button class="reopen-btn">✔️ Re-open</button>
                        <button class="delete-btn">❌</button>
                    </div>
                </div>
            `;
            completedTask.innerHTML += completedCard
        }
    } )
}

renderTasks()

// Setting up an event listener to prevent default refresh

form.addEventListener("submit", (event) => {
    event.preventDefault()

    // Getting what the user typed as a task
    let getTask = taskInput.value
    let getPriority = prioritySelect.value

    const newTask = {
        id: Date.now(),
        title: taskInput.value,
        priority: prioritySelect.value,
        status: "Pending"

    }

    tasks.push(newTask)
    saveToStorage()
    renderTasks()
   

    // clear the input after being added
    taskInput.value = "";

})


/* Right now, we have buttons inside our lists, but they don't do anything when clicked. Instead of adding a click event listener 
 to every single button we create (which breaks whenever a new task is added), we use a concept called Event Delegation. */

/* We attach one single event listener to the entire parent wrapper (pendingTask and completedTask), and whenever a 
 click happens inside them, we check exactly which element triggered it. */

pendingTask.addEventListener("click", (event) => {

/* Identify the Button: Inside that event listener, use event.target to check if the user clicked a 
 button with the class complete-btn or delete-btn. You can check this using .classList.contains() */

    if(event.target.classList.contains("complete-btn")){

        // Create a varible to find the parent card
        const taskCard = event.target.closest(".task-card")
        // Extract the unique id from that card using .dataset property
        const taskId = taskCard.dataset.id;

        // Look through out the array of data and find the id that mtches this ID and changes its status from "pending" to "compeleted".
        const foundTask = tasks.find(task => task.id == taskId)

        // Toggle the status: If a task was found, flip its status string: 
        if (foundTask){
            foundTask.status = "Completed"
        }
        
        renderTasks()
        saveToStorage()
    } 

    if(event.target.classList.contains("delete-btn")){
        // create a varible to find the parent card 
        const taskCard = event.target.closest(".task-card")

        //Extract the unique id from tat card using .dataset property 
        const taskId = taskCard.dataset.id;

        // GO through the database array and find the id that mates and delete the task
        tasks = tasks.filter(task => task.id != taskId)
    }
    renderTasks()
    saveToStorage()
})

completedTask.addEventListener("click", (event) => {
    // The investigator: Intercepting the Re-open command
    if(event.target.classList.contains("reopen-btn")){
        // Create a variable to find the parent card 
        const taskCard = event.target.closest(".task-card")

        // Extract the unique id from the card using .datset property
        const taskId = taskCard.dataset.id;

        // Using .find to find the task
        const foundTask = tasks.find(task => task.id == taskId)

        if (foundTask){
            foundTask.status = "Pending" // Flip it back
        }

        renderTasks()
        saveToStorage()
    }


    // The Eraser: Wiping out a completed task completely

    if (event.target.classList.contains("delete-btn")){
        
        // Create a variable to find the parent card 
        const taskCard = event.target.closest(".task-card")

        // Extract the unique id from the card using .dataset property
        const taskId = taskCard.dataset.id;

        // Go through the data and find out the id that matches and delete the task as well 
        tasks = tasks.filter( task => task.id != taskId)
        

        
    renderTasks()
    saveToStorage()
    }

})

// To save our list of task even after a refresh there is a need ti save them in the localStorage

function saveToStorage(){
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

console.log(localStorage)