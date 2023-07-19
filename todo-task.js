const createTaskElement = (description) => {
  const taskElement = document.createElement("p");
  taskElement.innerText = description;
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
  #task;

  constructor() {
    this.#task = [];
  }

  addTask(description) {
    this.#task.push({ description, taskCompleted: false });
  }

  sortAlphabetical() {
    this.#task.sort((task1, task2) => task1.description < task2.description ? -1 : 1);
  }

  get allTask() {
    return [...this.#task];
  }
}

const main = () => {
  const addTask = document.querySelector("#add-task");
  const todoListContainer = document.querySelector("#todo-list");
  const taskDetails = document.querySelector("#task-details");
  const sortbutton = document.querySelector("#sort-button");
  const tasks = new Task();

  const createTask = () => {
    const task = taskDetails.value;
    tasks.addTask(task);
    taskDetails.value = "";
    const taskElement = createTaskElement(task);
    addClickEvent(taskElement);
    todoListContainer.append(taskElement);
  };

  const sortTaskAlphabetical = () => {
    while (todoListContainer.firstChild) {
      todoListContainer.removeChild(todoListContainer.firstChild);
    }

    tasks.sortAlphabetical();
    tasks.allTask.forEach(task => {
      const { description, _ } = task;
      const taskElement = createTaskElement(description);
      addClickEvent(taskElement);
      todoListContainer.appendChild(taskElement);
    });
  };

  sortbutton.onclick = sortTaskAlphabetical;
  addTask.onclick = createTask;
};

window.onload = main;