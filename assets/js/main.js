// main.js

import { fetchTodos } from "./fetch.js";
import { renderTask } from "./render.js";

// DOM Elements
const fetchTodosButton = document.getElementById("fetch-todos");
const addTaskForm = document.getElementById("add-task-form");
const newTaskInput = document.getElementById("new-task-input");

// Add new task
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTask = {
    id: Date.now(),
    title: newTaskInput.value,
    completed: false,
  };
  renderTask(newTask);
  newTaskInput.value = ""; // Clear the input field
});

// Fetch todos when the button is clicked
fetchTodosButton.addEventListener("click", fetchTodos);