const createTaskElement = (description, id) => {
  const taskElement = document.createElement("p");
  taskElement.setAttribute("id", id);
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
  #tasks;
  #taskCount;

  constructor() {
    this.#tasks = [];
    this.#taskCount = 0;
  }

  sortByCompletion() {
    return this.#tasks.toSorted((task1, task2) =>
      task1.taskCompleted < task2.taskCompleted ? 1 : -1
    );
  }

  #incrementCount() {
    this.#taskCount++;
  }

  add(description) {
    const id = this.#taskCount;
    this.#tasks.push({ description, taskCompleted: false, id });
    this.sortByCompletion();
    this.#incrementCount();
  }

  get allTasks() {
    return [...this.#tasks];
  }
}

class TaskListController {
  #taskList;

  constructor(taskList) {
    this.#taskList = taskList;
  }

  addToTaskList(description) {
    this.#taskList.add(description);
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

const sortTaskAlphabetical = (
  todoListContainer,
  taskListController,
  sortStatus
) => {
  while (todoListContainer.firstChild) {
    todoListContainer.removeChild(todoListContainer.firstChild);
  }

  taskListController.sortedTasks.forEach((task) => {
    const { description, _, id } = task;
    const taskElement = createTaskElement(description, id);
    addClickEvent(taskElement, taskListController);
    todoListContainer.appendChild(taskElement);
  });
  sortStatus.innerText = "Alphabetical";
};

const render = (todoListContainer, taskListController, taskList) => {
  while (todoListContainer.firstChild) {
    todoListContainer.removeChild(todoListContainer.firstChild);
  }

  taskList.allTasks.forEach((task) => {
    const { description, _, id } = task;
    const taskElement = createTaskElement(description, id);
    addClickEvent(taskElement, taskListController);
    todoListContainer.appendChild(taskElement);
  });
};

const createTask = (
  todoListContainer,
  taskDetails,
  taskListController,
  taskList
) => {
  const description = taskDetails.value;
  taskListController.addToTaskList(description);
  render(todoListContainer, taskListController, taskList);
  taskDetails.value = "";
};

const sortByAdded = (
  todoListContainer,
  taskList,
  sortStatus,
  taskListController
) => {
  while (todoListContainer.firstChild) {
    todoListContainer.removeChild(todoListContainer.firstChild);
  }

  taskList.allTasks.forEach((task) => {
    const { description, _, id } = task;
    const taskElement = createTaskElement(description, id);
    addClickEvent(taskElement, taskListController);
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
  const sortByCompletionButton = document.querySelector("#sort-by-completion");
  const taskList = new TaskList();
  const taskListController = new TaskListController(taskList);

  sortButton.onclick = () => {
    sortTaskAlphabetical(todoListContainer, taskListController, sortStatus);
  };

  sortByAddedButton.onclick = () => {
    sortByAdded(todoListContainer, taskList, sortStatus);
  };

  addTask.onclick = () => {
    createTask(todoListContainer, taskDetails, taskListController, taskList);
  };
};

window.onload = main;
