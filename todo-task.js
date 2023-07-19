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
  const addTask = document.querySelector("#add-task");
  const todoListContainer = document.querySelector("#todo-list");
  const taskDetailsElement = document.querySelector("#task-details");
  const taskList = [];

  const onNewTask = () => {
    const task = taskDetailsElement.value;
    taskList.push({ task, taskCompleted: false });
    taskDetailsElement.value = "";
    const taskElement = createTaskElement(task);
    addClickEvent(taskElement);
    todoListContainer.append(taskElement);
  };

  addTask.onclick = onNewTask;
};

window.onload = main;