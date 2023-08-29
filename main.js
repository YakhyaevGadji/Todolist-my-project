const from = document.querySelector('.form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');
const allBtn = document.querySelector('[data-card="all"]');
const deleteBtn = document.querySelector('[data-card="delete"]');
const favoriteBtn = document.querySelector('[data-card="favorite"]');
const buttonsRow = document.querySelectorAll('.header__list-item');
const filterBtn = document.querySelector('#filter');
const filterList = document.querySelector('.filter__list');
const filters = document.querySelectorAll('[data-filter]');

from.addEventListener('submit', addNewTask);
list.addEventListener('click', taskDone);
list.addEventListener('dblclick', chengeTextInTask);
list.addEventListener('click', taskDelete);
list.addEventListener('click', taskFaforite);

deleteBtn.addEventListener('click', renderDeleteTask);
allBtn.addEventListener('click', renderAllTask);
favoriteBtn.addEventListener('click', renderFavoriteTask);
filterBtn.addEventListener('click', styleActiveInFilter);

filters.forEach((filter) => {
    filter.addEventListener('click', filterTaskList);
});

let date = {
    all: [],
    deleted: [],
    favorites: []
};

function addNewTask(event) {
    event.preventDefault();

    const taskInfo = {
        id: Date.now(),
        title: input.value,
        done: false,
        favorites: false,
        deleted: false
    }
    
    list.insertAdjacentHTML('beforeend', renderHtmlTask(taskInfo));

    date.all.push(taskInfo);
    
    input.value = '';
}

function renderHtmlTask(taskInfo) {
    const cssTask = taskInfo.done ? 'task__text_active' : 'task__text';
    let check = '';
    let favorit = '';

    if(taskInfo.done) {
        check = 'checked';
    }

    if(taskInfo.favorites) {
        favorit = 'checked';
    }
    
    const taskHTML = `<li class="task__item" id="${taskInfo.id}">
        <div class="task__block">
            <input type="checkbox" class="task__checkbox" ${check}  data-action="done">
            <p class="${cssTask}" data-action="taskText">${taskInfo.title}</p>
        </div>
         <div class="setting">
            <button class="task__remove" data-action="delete">delete</button>
            <input type="checkbox" ${favorit} data-action="favorites">
        </div>
    </li`;

    return taskHTML;
}

function taskDone(event) {
    if(event.target.dataset.action === 'done') {
        const parent = event.target.closest('.task__item');
        const parentId = Number(parent.id);
        const taskTitle = parent.querySelector('[data-action="taskText"]');

        date.all.findIndex((item) => {
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

            date.all.forEach((item) => {
                if(parentId === item.id) {
                    item.title = taskNewInput.value;
                }
            });

            taskNewInput.remove();
        });
        taskNewInput.focus();
    }
}

function taskDelete(event) {
    if(event.target.dataset.action === 'delete') {
        const parentEl = event.target.closest('.task__item');
        const parentId = Number(parentEl.id);
        
        const taskIndex = date.all.findIndex((item) => {
            if(item.id === parentId) {
                item.deleted = !item.deleted;
                date.deleted.push(item);
                return true;
            }
        });

        date.all.splice(taskIndex, 1);
        parentEl.remove();
    }
}

function taskFaforite(event) {
    if(event.target.dataset.action === 'favorites') {
        const parentEl = event.target.closest('.task__item');
        const parentId = Number(parentEl.id);

        date.all.forEach((item) => {
            if(parentId === item.id) {
                if(item.favorites) {
                    item.favorites = false;
                    parentEl.remove();
                    date.favorites.splice(item, 1);
                }else {
                    item.favorites = true;
                    date.favorites.push(item);
                }
            }
        });
        
    }
}
function renderDeleteTask() {
    const childrens = list.querySelectorAll('.task__item');
    
    childrens.forEach((item) => {
        item.remove();
    });
    
    date.deleted.forEach((item) => {
        list.insertAdjacentHTML('beforeend', renderHtmlTask(item));
    });

    activeButtonTask(this);
}
function renderAllTask() {
    const childrens = list.querySelectorAll('.task__item');
    
    childrens.forEach((item) => {
        item.remove();
    });
    
    date.all.forEach((item) => {
        list.insertAdjacentHTML('beforeend', renderHtmlTask(item));
    });

    activeButtonTask(this);
}
function renderFavoriteTask() {
    const childrens = list.querySelectorAll('.task__item');
    
    childrens.forEach((item) => {
        item.remove();
    });
    
    date.favorites.forEach((item) => {
        list.insertAdjacentHTML('beforeend', renderHtmlTask(item));
    });
    
    activeButtonTask(this);
}
function activeButtonTask(elem) {
    buttonsRow.forEach((item) => {
        item.classList.remove('header__list-item__active');
    });
    elem.classList.add('header__list-item__active');
}
function styleActiveInFilter() {
    if(filterList.classList[1] === 'filter__list_active') {
        filterList.classList.remove('filter__list_active');
    }else {
        filterList.classList.add('filter__list_active');
    }
}
function filterTaskList() {
    if(this.dataset.filter === 'new') {
        date.all.forEach((item) => {
            
        });
    }else {
        
    }
    filterList.classList.toggle('filter__list_active');
}


