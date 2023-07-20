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

class Todo {
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

class TodoController {
  #todo;

  constructor(todo) {
    this.#todo = todo;
  }

  addTodo(description) {
    this.#todo.add(description);
  }

  #sortAlphabetical() {
    const todo = this.#todo.allTasks;
    return todo.toSorted((task1, task2) =>
      task1.description < task2.description ? -1 : 1
    );
  }

  get sortedTodo() {
    return this.#sortAlphabetical();
  }
}

const sortTaskAlphabetical = (
  todoContainer,
  todoController,
  sortStatus
) => {
  while (todoContainer.firstChild) {
    todoContainer.removeChild(todoContainer.firstChild);
  }

  todoController.sortedTodo.forEach((task) => {
    const { description, _, id } = task;
    const taskElement = createTaskElement(description, id);
    addClickEvent(taskElement, todoController);
    todoContainer.appendChild(taskElement);
  });
  sortStatus.innerText = "Alphabetical";
};

const render = (todoContainer, todoController, todo) => {
  while (todoContainer.firstChild) {
    todoContainer.removeChild(todoContainer.firstChild);
  }

  todo.allTasks.forEach((task) => {
    const { description, _, id } = task;
    const taskElement = createTaskElement(description, id);
    addClickEvent(taskElement, todoController);
    todoContainer.appendChild(taskElement);
  });
};

const createTask = (
  todoContainer,
  taskDetails,
  todoController,
  todo
) => {
  const description = taskDetails.value;
  todoController.addTodo(description);
  render(todoContainer, todoController, todo);
  taskDetails.value = "";
};

const sortByAdded = (
  todoContainer,
  todo,
  sortStatus,
  todoController
) => {
  while (todoContainer.firstChild) {
    todoContainer.removeChild(todoContainer.firstChild);
  }

  todo.allTasks.forEach((task) => {
    const { description, _, id } = task;
    const taskElement = createTaskElement(description, id);
    addClickEvent(taskElement, todoController);
    todoContainer.appendChild(taskElement);
  });
  sortStatus.innerText = "Added";
};

const main = () => {
  const addTask = document.querySelector("#add-task");
  const todoContainer = document.querySelector("#todo-list");
  const taskDetails = document.querySelector("#task-details");
  const sortButton = document.querySelector("#sort-button");
  const sortByAddedButton = document.querySelector("#sort-by-added");
  const sortStatus = document.querySelector("#sort-status");
  const sortByCompletionButton = document.querySelector("#sort-by-completion");
  const todo = new Todo();
  const todoController = new TodoController(todo);

  sortButton.onclick = () => {
    sortTaskAlphabetical(todoContainer, todoController, sortStatus);
  };

  sortByAddedButton.onclick = () => {
    sortByAdded(todoContainer, todo, sortStatus);
  };

  addTask.onclick = () => {
    createTask(todoContainer, taskDetails, todoController, todo);
  };
};

window.onload = main;
