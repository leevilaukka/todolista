import { todosLeft } from "./index.js";

// Class definition for TodoItem
export default class TodoItem {
    constructor(text, color, createdAt, id, done = false) {
        this.text = text;
        this.createdAt = createdAt || new Date().toLocaleString("fi-FI");
        this.done = done;
        this.id = id || new Date().getTime();
        this.element = this.createElement(text);
        this.doneButton = this.element.querySelector('.item-button');
        this.color = color || '#fff';
        this.element.style.backgroundColor = this.color;
    }

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

        // Item text
        

        // Append elements
        div.appendChild(span);
        div.appendChild(time);
        div.appendChild(buttonDiv);
        buttonDiv.appendChild(doneButton);
        buttonDiv.appendChild(deleteButton);


        return div;
    }


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

    removeFromStorage() {
        let todos = JSON.parse(localStorage.getItem('todos'));
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == this.id) {
                todos.splice(i, 1);
            }
        }
        localStorage.setItem('todos', JSON.stringify(todos));
        this.update()
    }
    
    update() {
        this.done = !this.done;
        console.log('Update item');
        let todos = JSON.parse(localStorage.getItem('todos'));
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == this.id) {
                todos[i].done = this.done;
            }
        }

        if (this.done) {
            this.doneButton.textContent = '❌';
        } else {
            this.doneButton.textContent = '✔️';
        }

        if (todos.filter(item => item.done === false).length === 0) {
            todosLeft.textContent = 'Kaikki tehty! 🎉';
        } else {
            todosLeft.textContent = `${todos.filter(item => item.done === false).length} jäljellä`;
        }

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    remove() {
        this.element.remove();
        this.removeFromStorage();
    }
}