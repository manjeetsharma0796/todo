const createTaskElement = (name) => {
  const taskElement = document.createElement("p");
  taskElement.innerText = name;
  return taskElement;
};

const addClickEvent = (taskElement) => {
  taskElement.onclick = () => {
    taskElement.classList.add("marked");

    taskElement.onclick = () => {
      taskElement.classList.remove("marked");
      addClickEvent(taskElement);
    };
  };
};

const main = () => {
  const addTask = document.querySelector("#add-task");
  const todoListContainer = document.querySelector("#todo-list");
  const taskDetails = document.querySelector("#task-details");
  const taskList = [];

  const createTask = () => {
    const task = taskDetails.value;
    taskList.push({ task, taskCompleted: false });
    taskDetails.value = "";
    const taskElement = createTaskElement(task);
    addClickEvent(taskElement);
    todoListContainer.append(taskElement);
  };

  addTask.onclick = createTask;
};

window.onload = main;