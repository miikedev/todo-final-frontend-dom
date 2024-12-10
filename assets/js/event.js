import { renderTask, renderErr, renderLoading, removeLoading } from "./render.js";

const newTaskInput = document.getElementById("new-task-input");
const searchInput = document.getElementById("search-input");

import { setState, addTask, state } from "./state.js";

let currentOrder = 'asc';

// Add new task
export function handleAddTask(event) {
  event.preventDefault();

  const newTask = {
    id: Date.now(),
    title: newTaskInput.value.trim(),
    completed: false,
  };
  console.log(newTask);
  if(newTaskInput.value.trim() !== "") {
    addTask(newTask);
  }
  newTaskInput.value = ""; // Clear the input field
}

// Fetch todos from the API
export async function fetchTodos() {
  try {
    renderLoading("Loading...");
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    const todos = await response.json();
    removeLoading();

    if (!response.ok) {
      renderErr(`Failed to fetch tasks: ${response.status}`);
      return;
    }
    console.log(todos)
    await setState([...todos, ...state.tasks]); // Initialize state with tasks
  } catch (error) {
    removeLoading();
    renderErr("An error occurred while fetching tasks.");
  }
}

// Function to handle removing tasks
export function handleRemoveTasks() {
  setState([]); // Clear all tasks
}

// Function to handle ordering
export const handleOrder = (event) => {
  event.preventDefault();
  currentOrder = currentOrder === 'asc' ? 'desc' : 'asc';
  sortTasks(currentOrder);
}

// Function to handle search
export const handleSearch = (event) => {
  event.preventDefault();
  const searchValue = searchInput.value.trim().toLowerCase();

  // Filter the tasks based on the search value
  const filteredTasks = state.tasks.filter(task =>
      task.title.toLowerCase().includes(searchValue)
  );

  renderTasks(filteredTasks); // Render filtered tasks
}

// Function to sort tasks
const sortTasks = (order) => {
  // Sort the tasks based on the current order
  const sortedTasks = [...state.tasks].sort((a, b) => {
    return order === 'asc' ? a.id - b.id : b.id - a.id; // Sort by id numerically
  });

  // Update the state with sorted tasks
  setState(sortedTasks);

  // Optionally, re-render the tasks if needed
  renderTasks(sortedTasks); // Call a function to render the tasks
}

// Function to render tasks (assumed to be defined)
const renderTasks = (tasks) => {
  // Clear existing tasks in the UI
  const taskList = document.getElementById("task-list"); // Assuming you have a UL or OL with this ID
  taskList.innerHTML = ""; // Clear existing tasks

  // Render each task
  tasks.forEach(task => {
    renderTask(task); // Assuming renderTask handles adding each task to the UI
  });
}

export const toggleTheme = () => {
  const app = document.getElementById('app');
  const button = document.querySelectorAll('.button'); // Reference to theme toggle button
  // const fetchButton = document.getElementById('fetch-todos'); // Reference to the fetch button
  // const deleteButtons = document.querySelectorAll('.delete-task'); // Assuming each delete button has the class 'delete-task'
  const lightIcon = document.getElementById('light-icon');
  const darkIcon = document.getElementById('dark-icon');

  app.classList.toggle('dark-mode');
  // Update styles for fetch and delete buttons
  const isDarkMode = app.classList.contains('dark-mode');
  // fetchButton.classList.toggle('dark-mode', isDarkMode); // Update fetch button styles
  button.forEach(btn => {
    btn.classList.toggle('dark-mode', isDarkMode); // Update all delete buttons
  });

  // Change icons based on the current theme
  if (isDarkMode) {
    darkIcon.style.display = 'block'; // Show dark icon
    lightIcon.style.display = 'none'; // Hide light icon
    localStorage.setItem('theme', 'dark'); // Save current theme
  } else {
    darkIcon.style.display = 'none'; // Hide dark icon
    lightIcon.style.display = 'block'; // Show light icon
    localStorage.setItem('theme', 'light'); // Save current theme
  }
}

// Function to set the theme based on local storage
export const setThemeFromLocalStorage = () => {
  const storedTheme = localStorage.getItem('theme');
  const app = document.getElementById('app');
  const button = document.querySelectorAll('.button'); // Reference to theme toggle button
  // const fetchButton = document.getElementById('fetch-todos'); // Reference to the fetch button
  // const deleteButtons = document.querySelectorAll('.delete-task'); // Get all delete buttons
  const lightIcon = document.getElementById('light-icon');
  const darkIcon = document.getElementById('dark-icon');

  const isDarkMode = storedTheme === 'dark';

  if (isDarkMode) {
    app.classList.add('dark-mode');
    button.forEach(btn => btn.classList.toggle('dark-mode'));

    darkIcon.style.display = 'block'; // Show dark icon
    lightIcon.style.display = 'none'; // Hide light icon
  } else {
    app.classList.remove('dark-mode');
    // button.classList.remove('dark-mode'); // Remove styles from theme toggle button
    button.forEach(btn => btn.classList.remove('dark-mode'));

    darkIcon.style.display = 'none'; // Hide dark icon
    lightIcon.style.display = 'block'; // Show light icon
  }
}

// Function to update styles of other elements based on theme
const updateOtherStyles = (isDarkMode) => {
  const elementsToChange = document.querySelectorAll('.some-selector'); // Replace with your actual selectors
  elementsToChange.forEach(element => {
    if (isDarkMode) {
      element.style.backgroundColor = '#1f1f1f'; // Example dark mode background
      element.style.color = '#ffffff'; // Example light mode text color
    } else {
      element.style.backgroundColor = '#ffffff'; // Example light mode background
      element.style.color = '#000000'; // Example dark mode text color
    }
  });
}