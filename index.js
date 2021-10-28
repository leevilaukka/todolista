// Import TodoItem class
import TodoItem from "./todoItem.js";

// Grab elements
const list = document.getElementById('list');
const form = document.getElementById('form');
const textInput = document.getElementById('textinput');
const colorInput = document.getElementById('colorinput');
export const todosLeft = document.getElementById('todosleft');
const clearDoneButton = document.getElementById('clearDone'); 
const clearAllButton = document.getElementById('clearAll');

// Function to get unfinished todos
export const itemsLeft = () => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let count = 0;
    if (todos) {
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].done) {
                count++;
            }
        }
        return count;
    } else {
        return 0;
    }    
}

// Set todosleft text
todosLeft.textContent = itemsLeft() > 0 ? `${itemsLeft()} tekemättä` : 'Kaikki tehty! 🎉';

let todos = JSON.parse(localStorage.getItem('todos'));
if (todos) {
    for (let i = 0; i < todos.length; i++) {
        const todo = new TodoItem(todos[i].text, todos[i].color, todos[i].createdAt, todos[i].id, todos[i].done);
        list.appendChild(todo.element);
    }
}

// Form submit
form.onsubmit = (e) => {
    // Prevent default form action (refresh)
    e.preventDefault();

    // Checks if input is really filled, and if it's not, alert user
    if (textInput.value.length < 4) {
        return alert('Muistutuksesi on liian lyhyt, sen tulee olla vähintään 4 merkkiä pitkä');
    }

    // Create new todo item object from class TodoItem
    const newTodo = new TodoItem(textInput.value, colorInput.value);

    // Add new todo item to list
    newTodo.saveToStorage();

    // Add new todo item to DOM
    list.appendChild(newTodo.element);

    // Clear input fields
    textInput.value = '';
    colorInput.value = '#0F7173';

    // Update todosleft text
    let todos = JSON.parse(localStorage.getItem('todos'));
    todosLeft.textContent = `${todos.filter(item => item.done === false).length} tekemättä`
};

// Clear done button
clearDoneButton.onclick = () => {
    // If all todos are done, alert user
    if(!itemsLeft()){
        return alert('Kaikki on jo tehty!');
    }
    
    // Get todos from local storage
    const todos = JSON.parse(localStorage.getItem('todos'))
    // Filter todos to get only unfinished todos
    const newTodos = todos.filter(todo => !todo.done);
    
    // Confirm user action
    const sure = confirm(`Haluatko varmasti poistaa valmiit kohteet? (${todos.length - newTodos.length} kappaletta)`);

    // If user confirms, update local storage and reload page
    if(sure){
        localStorage.setItem('todos', JSON.stringify(newTodos));
        location.reload();
    }
}

// Clear all todos- button
clearAllButton.onclick = () => {
    // If there are no todos, alert user
    if(!itemsLeft()){
        return alert('Ei poistettavia kohteita!');
    }

    // Get todos from local storage for todos.length
    const todos = JSON.parse(localStorage.getItem('todos'));

    // Confirm user action
    const sure = confirm(`Haluatko varmasti poistaa kaikki kohteet? (${todos.length} kappaletta)`);

    // Clear local storage
    if(sure){
        localStorage.removeItem('todos');
        location.reload();
    }
}

