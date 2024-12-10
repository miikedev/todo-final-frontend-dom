import { renderTaskList } from "./render.js";

// State
export const state = {
    tasks: [], // Centralized task state,
    theme: 'dark',
    auth: false,
    users: [
        {
            username: 'thurein',
            email: 'thurein@todolist.com',
            password: 'password'
        }
    ]
};

// Add a new user to the state
export function addUser(user) {
    state.users.push(user);
}

// Authenticate the user
export function authenticate(username, password) {
    const user = state.users.find(
        (u) => u.username === username && u.password === password
    );
    if (user) {
        state.auth = true; // Set auth to true
        return true; // Authentication successful
    }
    return false; // Authentication failed
}

// Check if the user is authenticated
export function isAuthenticated() {
    return state.auth;
}

// Update state and re-render tasks
export function setState(newTasks) {
    state.tasks = newTasks; // Update state
    renderTaskList(state.tasks); // Reflect state changes in the DOM
}

// Add a new task to the state
export const addTask = (task) => {
    setState([task,...state.tasks]); // Add new task to the beginning of the list
}

// Delete a task from the state
export function deleteTask(taskId) {
    console.log('deleted id',taskId)
    const filteredTasks = state.tasks.filter(task => task.id !== taskId);
    setState(filteredTasks); // Update state with filtered tasks
}

// Toggle task completion
export function toggleTask(taskId) {
    const updatedTasks = state.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setState(updatedTasks); // Update state with toggled task
}