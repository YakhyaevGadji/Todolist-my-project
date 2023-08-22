const form = document.querySelector('.form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');

form.addEventListener('submit', addNewTask);

let tasks = [];

function addNewTask(event) {
    event.preventDefault();
    
    const inputValue = input.value;
    input.focus();

    let taskInfo = {
        id: Date.now(),
        title: inputValue,
        done: false,
        favorites: false
    }

    if(inputValue.trim() !== "") {
        list.insertAdjacentHTML('beforeend', taskHtml(taskInfo))
    }

    input.value= '';
}
function taskHtml(taskInfo) {
    const stlyeTask = taskInfo.done ? "task__text_active" : "task__text";

    const taskHTML = `<li class="task__item" id="${taskInfo.id}">
        <div class="task__block">
            <input type="checkbox" class="task__checkbox" data-action="checkbox">
            <p class="${stlyeTask}">${taskInfo.title}</p>
        </div>
        <div class="setting">
            <button class="task__remove">delete</button>
            <input type="checkbox" id="favorites">
        </div>
    </li>`;

    return taskHTML
}