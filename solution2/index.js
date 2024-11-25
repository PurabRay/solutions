document.addEventListener('DOMContentLoaded',() => {
    const addButton = document.getElementById('add');
    const todoInput= document.getElementById('todo');
    const todoList = document.getElementById('todo-list');
    const searchInput = document.getElementById('search');
    const filters = document.getElementById('filters');
    let tasks = [];
    addButton.addEventListener('click', () => {
        if (todoInput.value.trim()) {
            tasks.push({ content: todoInput.value, completed: false });
            todoInput.value = '';
            renderTasks();
        }
    });
    function renderTasks(filter = 'all') {
        todoList.innerHTML = '';
        const filteredTasks = tasks.filter(task=>{
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        });
        filteredTasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.className ='todo-item';
            taskDiv.draggable = true;
            taskDiv.dataset.index = index;
            taskDiv.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} class="toggle-complete">
                <span contenteditable="true">${task.content}</span>
                <button class="delete-btn">X</button>
            `;
            todoList.appendChild(taskDiv);
        });
    }
    todoList.addEventListener('click', (e) => {
        const index = e.target.parentElement.dataset.index;
        if (e.target.classList.contains('delete-btn')) {
            tasks.splice(index, 1);
        } else if (e.target.classList.contains('toggle-complete')) {
            tasks[index].completed = e.target.checked;
        }
        renderTasks();
    });
    let draggedIndex;
    todoList.addEventListener('dragstart', (e) => {
        draggedIndex = e.target.dataset.index;
        e.target.classList.add('dragging');
    });
    todoList.addEventListener('dragend', (e) => e.target.classList.remove('dragging'));
    todoList.addEventListener('dragover', (e) => e.preventDefault());
    todoList.addEventListener('drop', (e) => {
        const targetIndex = e.target.closest('.todo-item').dataset.index;
        [tasks[draggedIndex], tasks[targetIndex]] = [tasks[targetIndex], tasks[draggedIndex]];
        renderTasks();
    });
    filters.addEventListener('click', (e) => {
        if (e.target.dataset.filter) renderTasks(e.target.dataset.filter);
    });
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll('.todo-item').forEach((item) => {
            const content = item.querySelector('span').textContent.toLowerCase();
            item.style.display = content.includes(query) ? 'flex' : 'none';
        });
    });
});
