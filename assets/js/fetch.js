// fetch.js

import { renderTask, renderErr, renderLoading, removeLoading } from "./render.js";

// Fetch todos from the API
export async function fetchTodos() {
  try {
    renderLoading("Loading...");

    // Simulate delay and fetch data
    setTimeout(async () => {
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