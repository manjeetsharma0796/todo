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

class TaskList {
  #task;

  constructor() {
    this.#task = [];
  }

  add(task) {
    this.#task.push(task);
  }

  sortAlphabetical() {
    this.#task.sort((task1, task2) => task1.description < task2.description ? -1 : 1);
  }

  get allTask() {
    return [...this.#task];
  }
}

class TaskListController {
  #taskList;

  constructor(taskList) {
    this.#taskList = taskList;
  }

  addToTaskList(description) {
    const task = { description, taskCompleted: false };
    this.#taskList.add(task);
  }
}

const main = () => {
  const addTask = document.querySelector("#add-task");
  const todoListContainer = document.querySelector("#todo-list");
  const taskDetails = document.querySelector("#task-details");
  const sortbutton = document.querySelector("#sort-button");
  const taskList = new TaskList();
  const taskListController = new TaskListController(taskList);

  const createTask = () => {
    const description = taskDetails.value;
    taskListController.addToTaskList(description);
    taskDetails.value = "";
    const taskElement = createTaskElement(description);
    addClickEvent(taskElement);
    todoListContainer.append(taskElement);
  };

  const sortTaskAlphabetical = () => {
    while (todoListContainer.firstChild) {
      todoListContainer.removeChild(todoListContainer.firstChild);
    }

    taskList.sortAlphabetical();
    taskList.allTask.forEach(task => {
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