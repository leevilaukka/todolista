import TodoItem from "./todoItem.js";
// Grab elements
const list = document.getElementById('list');
const form = document.getElementById('form');
const textInput = document.getElementById('textinput');
const colorInput = document.getElementById('colorinput');
export const todosLeft = document.getElementById('todosleft');
const clearDoneButton = document.getElementById('clearDone'); 
const clearAllButton = document.getElementById('clearAll');


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

todosLeft.textContent = itemsLeft() > 0 ? `${itemsLeft()} tekemättä` : 'Kaikki tehty! 🎉';

let todos = JSON.parse(localStorage.getItem('todos'));
if (todos) {
    for (let i = 0; i < todos.length; i++) {
        const todo = new TodoItem(todos[i].text, todos[i].color, todos[i].createdAt, todos[i].id, todos[i].done);
        list.appendChild(todo.element);
    }
}

form.onsubmit = (e) => {
    e.preventDefault();
    if (textInput.value.length < 4) {
        return alert('Muistutuksesi on liian lyhyt, sen tulee olla vähintään 4 merkkiä pitkä');
    }
    const newTodo = new TodoItem(textInput.value, colorInput.value);
    newTodo.saveToStorage();
    list.appendChild(newTodo.element);
    textInput.value = '';

    let todos = JSON.parse(localStorage.getItem('todos'));

    todosLeft.textContent = `${todos.filter(item => item.done === false).length} tekemättä`
};

clearDoneButton.onclick = () => {
    if(!itemsLeft()){
        return alert('Kaikki on jo tehty!');
    }
    
    const todos = JSON.parse(localStorage.getItem('todos'))
    const newTodos = todos.filter(todo => !todo.done);
    const sure = confirm(`Haluatko varmasti poistaa valmiit kohteet? (${todos.length - newTodos.length} kappaletta)`);
    if(sure){
        localStorage.setItem('todos', JSON.stringify(newTodos));
        location.reload();
    }
}

clearAllButton.onclick = () => {
    if(itemsLeft() === 0){
        return alert('Ei poistettavia kohteita!');
    }

    const todos = JSON.parse(localStorage.getItem('todos'));
    const sure = confirm(`Haluatko varmasti poistaa kaikki kohteet? (${todos.length} kappaletta)`);
    if(sure){
        localStorage.removeItem('todos');
        location.reload();
    }
}

