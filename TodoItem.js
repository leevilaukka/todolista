import { todosLeft } from "./index.js";

// Class definition for TodoItem
export default class TodoItem {
    // Class constructor for TodoItem
    constructor(text, color, createdAt, id, done = false) {
        // Text from input or localStorage
        this.text = text;

        // CreatedAt from localStorage or current time
        this.createdAt = createdAt || new Date().toLocaleString("fi-FI");
        this.done = done;

        // Get "random" id or use id from localStorage
        this.id = id || new Date().getTime();

        // Element to be returned
        this.element = this.createElement(text);
        this.doneButton = this.element.querySelector('.item-button');

        // Color from input, localStorage or default
        this.color = color || '#fff';
        this.element.style.backgroundColor = this.color;
    }

    // Method to create TodoItem element
    createElement(text) {
        console.log(this)
        // List item element
        const div = document.createElement('div');
    
        // Item classname
        div.className = `${this.done ? 'list-item deleted' : 'list-item'}`
        
        // Item text
        const span = document.createElement('span');
        span.className = 'item-text';
        span.textContent = text;

        // Item time
        const time = document.createElement('span');
        time.className = 'item-time';
        time.textContent = this.createdAt;

        // Div for buttons
        const buttonDiv = document.createElement('div')
        buttonDiv.className = 'item-button-div'

        // Done button
        const doneButton = document.createElement('button');
        doneButton.className = 'item-button';
        doneButton.textContent = !this.done ? '✔️' : '❌';

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'item-delete-button';
        deleteButton.textContent = `🗑️`;

        // Double click event listener to edit item
        div.addEventListener("dblclick", () => {
            this.update();
            if (this.done) {
                this.element.classList.add('deleted');
            } else {
                this.element.classList.remove('deleted');
            }
        })

        // Add event listener to done button
        doneButton.addEventListener('click', (e) => {
            this.update();
            if (this.done) {
                this.element.classList.add('deleted');
            } else {
                this.element.classList.remove('deleted');
            }
        });

        // Add event listener to delete button
        deleteButton.addEventListener('click', (e) => {
            this.remove();
        });

        // Append elements
        div.appendChild(span);
        div.appendChild(time);
        div.appendChild(buttonDiv);
        buttonDiv.appendChild(doneButton);
        buttonDiv.appendChild(deleteButton);

        // Return element
        return div;
    }


    // Method to save TodoItem to localStorage
    saveToStorage() {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(this);
        console.log(todos)
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Method to remove TodoItem from localStorage
    removeFromStorage() {
        let todos = JSON.parse(localStorage.getItem('todos'));
        // Loop through todos and remove item with matching id
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == this.id) {
                todos.splice(i, 1);
            }
        }
        // Update localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
        this.update()
    }
    
    // Method to update TodoItem state in localStorage
    update() {
        this.done = !this.done;
        console.log('Update item');
        let todos = JSON.parse(localStorage.getItem('todos'));
        // Loop through todos and update item with matching id
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == this.id) {
                todos[i].done = this.done;
            }
        }

        // Update text in DOM
        if (this.done) {
            this.doneButton.textContent = '❌';
        } else {
            this.doneButton.textContent = '✔️';
        }

        // Update TodosLeft
        if (todos.filter(item => item.done === false).length === 0) {
            todosLeft.textContent = 'Kaikki tehty! 🎉';
        } else {
            todosLeft.textContent = `${todos.filter(item => item.done === false).length} jäljellä`;
        }

        // Update localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Method to remove TodoItem from DOM and localStorage
    remove() {
        this.element.remove();
        this.removeFromStorage();
    }
}