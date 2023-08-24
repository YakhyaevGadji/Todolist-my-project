const from = document.querySelector('.form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');

from.addEventListener('submit', addNewTask);
list.addEventListener('click', taskDone);
list.addEventListener('dblclick', chengeTextInTask);
// list.addEventListener('click', taskDelete);

let tasks = [];

function addNewTask(event) {
    event.preventDefault();

    const taskInfo = {
        id: Date.now(),
        title: input.value,
        done: false,
        favorites: false,
        deleted: false
    }
   
    const cssTask = taskInfo.done ? 'task__text_active' : 'task__text';

    const taskHTML = `<li class="task__item" id="${taskInfo.id}">
        <div class="task__block">
            <input type="checkbox" class="task__checkbox" data-action="done">
            <p class="${cssTask}" data-action="taskText">${taskInfo.title}</p>
        </div>
         <div class="setting">
            <button class="task__remove" data-action="delete">delete</button>
            <input type="checkbox" data-action="favorites">
        </div>
    </li`;

    list.insertAdjacentHTML('beforeend', taskHTML);

    tasks.push(taskInfo);
    input.value = '';
}

function taskDone(event) {
    if(event.target.dataset.action === 'done') {
        const parent = event.target.closest('.task__item');
        const parentId = Number(parent.id);
        const taskTitle = parent.querySelector('[data-action="taskText"]');

        tasks.findIndex((item) => {
            if(parentId === item.id) {
                item.done = !item.done;
            }
        });
        taskTitle.classList.toggle('task__text_active');
    }
}
function chengeTextInTask(event) {
    if(event.target.dataset.action === 'taskText') {
        const parent = event.target.closest('.task__item');
        const parentId = Number(parent.id);
        const parentEl = event.target.parentElement;
        const taskTitle = event.target;
        const taskNewInput = document.createElement('input');

        parentEl.appendChild(taskNewInput);
        taskNewInput.value = taskTitle.textContent;
        taskTitle.textContent = '';

        taskNewInput.addEventListener('blur', function() {
            taskTitle.textContent = taskNewInput.value;

            tasks.forEach((item) => {
                if(parentId === item.id) {
                    item.title = taskNewInput.value;
                }
            });

            taskNewInput.remove();
        });
        taskNewInput.focus();
    }
}
