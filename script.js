const form = document.querySelector("form")
const taskInput = document.querySelector("#task-title-input")
const prioritySelect = document.querySelector("#task-priority-select")
const pendingTask = document.querySelector("#pending-tasks-container")
const completedTask = document.querySelector("#completed-tasks-container")

// Starting dataset array 

let tasks = [
    { id: 1, title: "Review InsightFilter deployment strategy", priority: "High", status: "Pending" },
    { id: 2, title: "Optimize CSS Grid breakpoints", priority: "Medium", status: "Completed" },
];

// Writing a function that loops through your tasks array, builds the HTML string for each card, 
// and injects them into the correct container based on whether their status is "Pending" or "Completed"

function renderTasks(){
    // Begin by clearing the task section to follow the logic.
    pendingTask.innerHTML = "";
    completedTask.innerHTML = "";

    tasks.forEach( (task) => {
        if (task.status === "Pending"){
            let pendingCard = ` 
                <div class="task-card" data-id="${task.id}">
                    <h3>${task.title}</h3>
                    <span>${task.priority}</span>
                    <div class="actions">
                        <button class="complete-btn">✔️</button>
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
                    <span>${task.priority}</span>
                    <div class="actions">
                        <button class="delete-btn">❌</button>
                    </div>
                </div>
            `;
            completedTask.innerHTML += completedCard
        }
    } )
}

renderTasks()

// Setting up an event listener tonprevent default refresh

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
    renderTasks()

    // clear the input after being added
    taskInput.value = "";

})


// Right now, we have buttons inside our lists, but they don't do anything when clicked. Instead of adding a click event listener 
// to every single button we create (which breaks whenever a new task is added), we use a concept called Event Delegation.

// We attach one single event listener to the entire parent wrapper (pendingTask and completedTask), and whenever a 
// click happens inside them, we check exactly which element triggered it.

pendingTask.addEventListener("click", (event) => {
// Identify the Button: Inside that event listener, use event.target to check if the user clicked a 
// button with the class complete-btn or delete-btn. You can check this using .classList.contains()
    if(event.target.classList.contains("complete-btn")){

        // Create a varible to find the parent card
        const taskCard = event.target.closest(".task-card")
        // Extract the unique id from that card using .dataset property
        const taskId = taskCard.dataset.id;

        console.log("User wants to complete the task with ID:", taskId)
    } 

    if(event.target.classList.contains("delete-btn")){
        // create a varible to find the parent card 
        const taskCard = event.target.closest(".task-card")

        //Extract the unique id from tat card using .dataset property 
        const taskId = taskCard.dataset.id;

        console.log("The user wants to delete task with ID", taskId)

    }
})

completedTask.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")){
        
        // Create a variable to find the parent card 
        const taskCard = event.target.closest(".task-card")

        // Extract the unique id from the card using .dataset property
        const taskId = taskCard.dataset.id;

        console.log(`The user wants to delete a task with ID: ${taskId}`)
        
    }
})