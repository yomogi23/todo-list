const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

const STORAGE_KEY = 'todo-tasks';
let tasks = [];

// 保存
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// 読み込み(壊れたデータがあっても止まらないようにする)
function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) tasks = saved;
  } catch (e) {
    tasks = [];
  }
}

// 画面を描き直す
function render() {
  taskList.textContent = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) span.classList.add('completed');
    span.addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      render();
    taskInput.value = '';
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      render();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// タスク追加
function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  tasks.push({ id: Date.now(), text: text, completed: false });
  saveTasks();
  render();

  taskInput.value = '';
  taskInput.focus();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.isComposing) {
    addTask();
  }
});

loadTasks();
render();
