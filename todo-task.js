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

class Task {
  #task

  constructor() {
    this.#task = [];
  };

  addTask(name) {
    this.#task.push({ name, taskCompleted: false });
  };

  sortAlphabetical() {
    this.#task.sort((task1, task2) => task1.name < task2.name ? -1 : 1);
  }

  get allTask() {
    return [...this.#task];
  }
};

const main = () => {
  const addTask = document.querySelector("#add-task");
  const todoListContainer = document.querySelector("#todo-list");
  const taskDetails = document.querySelector("#task-details");
  const sortbutton = document.querySelector('#sort-button');
  const tasks = new Task();

  const createTask = () => {
    const task = taskDetails.value;
    tasks.addTask(task);
    taskDetails.value = "";
    const taskElement = createTaskElement(task);
    addClickEvent(taskElement);
    todoListContainer.append(taskElement);
  };

  sortbutton.onclick = () => {
    while (todoListContainer.firstChild) {
      todoListContainer.removeChild(todoListContainer.firstChild);
    }
    tasks.sortAlphabetical();
    tasks.allTask.forEach(task => {
      const { name, _ } = task;
      const taskElement = createTaskElement(name);
      todoListContainer.appendChild(taskElement);
    });
  }

  addTask.onclick = createTask;
};

window.onload = main;