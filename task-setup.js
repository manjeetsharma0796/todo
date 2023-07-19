const getTodoContainer = () => document.querySelector("#todo-list");
const getAddTaskElement = () => document.querySelector("#add-task");
const getTaskDetailElement = () => document.querySelector("#task-details");

const createTaskElement = (name) => {
  const taskElement = document.createElement("p");
  taskElement.innerText = name;
  return taskElement;
};

const appendTask = (container, taskElements) => {
  taskElements.forEach(taskElement => {
    container.appendChild(taskElement);
  });
};

const readTask = (taskDetailsElement) => taskDetailsElement.value;


const markTask = (taskElement) => taskElement.classList.add("marked");
const clearMarkFromTask = (taskElement) => taskElement.classList.remove("marked");

const addClickEvent = (taskElement) => {
  taskElement.onclick = () => {
    markTask(taskElement);

    taskElement.onclick = () => {
      taskElement.classList.remove("marked");
      addClickEvent(taskElement);
    };
  };
};

const main = () => {
  const addTask = getAddTaskElement();
  const todoListContainer = getTodoContainer();
  const taskDetailsElement = getTaskDetailElement();
  const taskList = [];

  const onNewTask = () => {
    const task = readTask(taskDetailsElement);
    taskList.push({ task, taskCompleted: false });
    taskDetailsElement.value = "";
    const taskElement = createTaskElement(task);
    addClickEvent(taskElement);
    todoListContainer.append(taskElement);
  };

  addTask.onclick = onNewTask;
};

window.onload = main;