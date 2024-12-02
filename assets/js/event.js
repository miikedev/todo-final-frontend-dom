import { renderTask, renderErr, renderLoading, removeLoading } from "./render.js";
const newTaskInput = document.getElementById("new-task-input");

// Add new task
export function handleAddTask(event) {
  event.preventDefault();
  const newTask = {
    id: Date.now(),
    title: newTaskInput.value,
    completed: false,
  };
  renderTask(newTask);
  newTaskInput.value = ""; // Clear the input field
}
// fetch.js

export function handleRemoveTasks() {
    const tasks = document.querySelectorAll("li");
    tasks.forEach((task) => task.remove());
}
// Fetch todos from the API
export function fetchTodos() {
  try {
    renderLoading("Loading...");

    // Simulate delay and fetch data
    setTimeout( async() => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5").catch((error) => {
        removeLoading();
        renderErr(error.message);
        throw new Error(`Failed to fetch todos. Error: ${error.message}`);
      });

      removeLoading();

      if (!response.ok) {
        renderErr(`HTTP Error: ${response.status}`);
        return;
      }

      const todos = await response.json();
      todos.forEach(renderTask);
    }, 3000);
  } catch (error) {
    removeLoading();
    renderErr("Failed to fetch todos. Please try again later.");
  }
}