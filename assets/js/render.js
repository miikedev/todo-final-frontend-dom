// render.js

// DOM Elements
const taskList = document.getElementById("task-list");

// Render a single task
export function renderTask(task) {
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

// Render an error message
export function renderErr(message) {
  removeLoading();

  const errEl = document.createElement("span");
  errEl.innerText = message;
  errEl.style.color = "red"; // Make the error visually distinct
  errEl.id = "error-message"; // Add an ID for easy identification

  taskList.appendChild(errEl);
}

// Render a loading message
export function renderLoading(message) {
  let existingLoadingEl = document.getElementById("loading-message");
  if (!existingLoadingEl) {
    const loadingEl = document.createElement("span");
    loadingEl.innerText = message;
    loadingEl.style.color = "gray";
    loadingEl.id = "loading-message";

    taskList.appendChild(loadingEl);
  }
}

// Remove the loading indicator
export function removeLoading() {
  const loadingEl = document.getElementById("loading-message");
  if (loadingEl) {
    taskList.removeChild(loadingEl);
  }
}