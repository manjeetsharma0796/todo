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

  get allTasks() {
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

  #sortAlphabetical() {
    const tasks = this.#taskList.allTasks;
    return tasks.toSorted((task1, task2) =>
      task1.description < task2.description ? -1 : 1
    );
  }

  get sortedTasks() {
    return this.#sortAlphabetical();
  }
}

const sortTaskAlphabetical = (todoListContainer, taskListController, sortStatus) => {
  while (todoListContainer.firstChild) {
    todoListContainer.removeChild(todoListContainer.firstChild);
  }

  taskListController.sortedTasks.forEach((task) => {
    const { description, _ } = task;
    const taskElement = createTaskElement(description);
    addClickEvent(taskElement);
    todoListContainer.appendChild(taskElement);
  });
  sortStatus.innerText = "Alphabetical";
};

const createTask = (todoListContainer, taskDetails, taskListController) => {
  const description = taskDetails.value;
  taskListController.addToTaskList(description);
  const taskElement = createTaskElement(description);
  addClickEvent(taskElement);
  todoListContainer.append(taskElement);
  taskDetails.value = "";
};

const sortByAdded = (todoListContainer, taskList, sortStatus) => {
  while (todoListContainer.firstChild) {
    todoListContainer.removeChild(todoListContainer.firstChild);
  }

  taskList.allTasks.forEach((task) => {
    const { description, _ } = task;
    const taskElement = createTaskElement(description);
    addClickEvent(taskElement);
    todoListContainer.appendChild(taskElement);
  });
  sortStatus.innerText = "Added";
};

const main = () => {
  const addTask = document.querySelector("#add-task");
  const todoListContainer = document.querySelector("#todo-list");
  const taskDetails = document.querySelector("#task-details");
  const sortButton = document.querySelector("#sort-button");
  const sortByAddedButton = document.querySelector("#sort-by-added");
  const sortStatus = document.querySelector("#sort-status");
  const taskList = new TaskList();
  const taskListController = new TaskListController(taskList);

  sortButton.onclick = () => {
    sortTaskAlphabetical(todoListContainer, taskListController, sortStatus);
  };

  sortByAddedButton.onclick = () => {
    sortByAdded(todoListContainer, taskList, sortStatus);
  };

  addTask.onclick = () => {
    createTask(todoListContainer, taskDetails, taskListController);
  };
};

window.onload = main;
