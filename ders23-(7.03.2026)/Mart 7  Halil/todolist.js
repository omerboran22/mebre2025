` <li>
          <div class="task-item">
            <input type="checkbox" class="item-checkbox">
            <span class="d-block">text</span>
            <button class="btn btn-danger">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </li>`


function setLocalStorage(key,value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorageById(id) {
  const item = localStorage.getItem(id);
  return item ? JSON.parse(item) : null;
}

function removeLocalStorageById(id) {
  localStorage.removeItem(id);
}



document.addEventListener('DOMContentLoaded', function() {

  const taskItemIdPrefix = 'task-item-';
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskButton');
  const taskList = document.getElementById('taskList');

  function removeTask(event) {
    const taskId = event.currentTarget.dataset.id;
    const taskItem = document.getElementById(taskId);
    if (taskItem) {
      taskList.removeChild(taskItem);
      removeLocalStorageById(taskId);
    }
  }

  function TaskItemComponent(task,key) {
    const li= document.createElement('li');
    li.id = key ?? taskItemIdPrefix + Date.now();
    li.classList.add('task-item');
    li.classList.toggle('completed', task.completed || false);
    li.addEventListener('click', toggleTodoItem);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('item-checkbox');
    checkbox.checked = task.completed || false;
    li.appendChild(checkbox);


    const span = document.createElement('span');
    span.classList.add('d-block');
    span.textContent = task.text;
    li.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.dataset.id = li.id;
    deleteBtn.addEventListener('click', removeTask);
    deleteBtn.classList.add('btn', 'btn-danger');

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash');
    
    deleteBtn.appendChild(deleteIcon);
    li.appendChild(deleteBtn);

    return li;
  }

  function addTask(event) {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }
    const taskItem = TaskItemComponent({ text: taskText, completed: false });
    taskList.appendChild(taskItem);
    setLocalStorage(taskItem.id, {
      text: taskText,
      completed: false
    });
    taskInput.value = '';
  }

  function toggleTodoItem(event) {
    const taskitem=event.currentTarget;
    taskitem.classList.toggle('completed');
    const checkbox= taskitem.querySelector('.item-checkbox');
    if(checkbox){
      checkbox.checked=taskitem.classList.contains('completed');
      const taskId=taskitem.id;
      const taskData=getLocalStorageById(taskId);
      if(taskData){
        taskData.completed=checkbox.checked;
        setLocalStorage(taskId,taskData);
      }
    }
  }


  addTaskBtn.addEventListener('click',addTask)
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask(event);
    }
  });

  // Load tasks from localStorage on page load
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(taskItemIdPrefix)) {
      const task = getLocalStorageById(key);
      const taskItem = TaskItemComponent(task, key);
      taskList.appendChild(taskItem);
    }
  }

});