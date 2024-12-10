// main.js
import {addTask} from "./state.js";

console.log('to do list main js')
import {handleAddTask, fetchTodos, handleRemoveTasks, handleOrder, handleSearch, toggleTheme, setThemeFromLocalStorage} from "./event.js";
const themeButton = document.getElementById('theme-toggle');
const fetchTodosButton = document.getElementById("fetch-todos");
const addTaskForm = document.getElementById("add-task-form");
const removeTasks = document.getElementById("remove-tasks");
const searchForm = document.getElementById("search-form");
const updownTasks = document.getElementById("up-down-tasks");

setThemeFromLocalStorage("theme");

addTaskForm.addEventListener("submit", handleAddTask);
fetchTodosButton.addEventListener("click", fetchTodos);
removeTasks.addEventListener("click", handleRemoveTasks);
updownTasks.addEventListener("click", handleOrder);
searchForm.addEventListener("input", handleSearch);
themeButton.addEventListener("click", toggleTheme);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        console.log("User is not actively using the webpage.");
    } else {
        console.log("User has returned to the webpage.");
    }
});


