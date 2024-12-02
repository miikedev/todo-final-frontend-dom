// main.js
import { renderTask } from "./render.js";
import { handleAddTask, fetchTodos, handleRemoveTasks } from "./event.js";
const fetchTodosButton = document.getElementById("fetch-todos");
const addTaskForm = document.getElementById("add-task-form");
const removeTasks = document.getElementById("remove-tasks")
// Attach event listeners
addTaskForm.addEventListener("submit", handleAddTask);
fetchTodosButton.addEventListener("click", fetchTodos);
removeTasks.addEventListener("click", handleRemoveTasks);

// Example: Remove listeners dynamically (only if needed later in your app)
function cleanupListeners() {
  addTaskForm.removeEventListener("submit", handleAddTask);
  fetchTodosButton.removeEventListener("click", handleFetchTodos);
}