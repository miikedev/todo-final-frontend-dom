// DOM Elements
const fetchTodosButton = document.getElementById("fetch-todos");
const taskList = document.getElementById("task-list");
const addTaskForm = document.getElementById("add-task-form");
const newTaskInput = document.getElementById("new-task-input");

// Function to Render Tasks
function renderTask(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  // Checkbox to mark completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
  });

  // Task text
  const text = document.createElement("span");
  text.textContent = task.title;
  if (task.completed) {
    li.classList.add("completed");
  }

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    li.remove();
  });

  // Append elements to list item
  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(deleteButton);

  // Append list item to task list
  taskList.appendChild(li);
}

function renderErr(message) {
  // Remove any existing loading indicator before showing an error
  removeLoading();
  
  const errEl = document.createElement("span");
  errEl.innerText = message;
  errEl.style.color = "red"; // Make the error visually distinct
  errEl.id = "error-message"; // Add an ID for easy identification

  // Append the error message to the task list
  taskList.appendChild(errEl);
}

function renderLoading(message) {
  // Check if a loading indicator already exists
  let existingLoadingEl = document.getElementById("loading-message");
  if (!existingLoadingEl) {
    const loadingEl = document.createElement("span");
    loadingEl.innerText = message;
    loadingEl.style.color = "gray"; // Make the loading message visually distinct
    loadingEl.id = "loading-message"; // Add an ID for easy identification

    // Append the loading message to the task list
    taskList.appendChild(loadingEl);
  }
}

function removeLoading() {
  // Find the loading indicator by its ID
  const loadingEl = document.getElementById("loading-message");
  if (loadingEl) {
    taskList.removeChild(loadingEl); // Remove the loading indicator if it exists
  }
}

async function fetchTodos() {
  try {
    // Show the loading indicator
    renderLoading("Loading...");

    // Simulate a delay for demonstration purposes
    setTimeout(async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5").catch(error => {
        removeLoading();
        renderErr(error.message)
        throw new Error(`Failed to fetch todos. Error: ${error.message}`);
      }); // Corrected URL
      removeLoading(); // Remove the loading indicator when the fetch is done

      // Check if the response is OK
      if (!response.ok) {
        console.error(`Network response was not ok. Status: ${response.status}`);
        renderErr(`HTTP Error: ${response.status}`);
        return;
      }

      // Parse the JSON and render tasks
      const todos = await response.json();
      todos.forEach((n) => renderTask(n));
    }, 3000);
  } catch (error) {
    // Remove the loading indicator if an error occurs
    removeLoading();

    // Show an error message
    console.error("Fetch Error:", error); // Log the error for debugging
    renderErr("Failed to fetch todos. Please try again later.");
  }
}
// Fetch Todos from API


// Add New Task
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTask = {
    id: Date.now(),
    title: newTaskInput.value,
    completed: false,
  };
  renderTask(newTask);
  newTaskInput.value = "";
});

// Event Listeners
fetchTodosButton.addEventListener("click", fetchTodos);