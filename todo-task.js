const createTaskElement = (description, id) => {
  const taskElement = document.createElement("p");
  taskElement.setAttribute("id", id);
  taskElement.innerText = description;
  return taskElement;
};

class Task {
  constructor(description, id) {
    this.description = description;
    this.taskCompleted = false;
    this.id = id;
  }

  toggle() {
    this.taskCompleted = this.taskCompleted ? false: true;
  }
}

class Todo {
  #todo;

  constructor() {
    this.#todo = [];
  }

  sortByAlphabetical() {
    return this.#todo.toSorted((task1, task2) =>
      task1.description < task2.description ? -1 : 1
    );
  }

  sortByStatus() {
    return this.#todo.toSorted((task1, task2) =>
      task1.taskCompleted < task2.taskCompleted ? -1 : 1
    );
  }

  add(task) {
    this.#todo.push(task);
  }

  toggleStatus(id) {
    const task = this.#todo[id];
    task.toggle();
  }

  get allTasks() {
    return [...this.#todo];
  }
}

class TodoController {
  #todo;
  #taskCount;

  constructor(todo) {
    this.#todo = todo;
    this.#taskCount = 0;
  }

  toggleStatus(id) {
    this.#todo.toggleStatus(id);
  }

  #incrementCount() {
    this.#taskCount += 1;
  }

  addTask(description) {
    const id = this.#taskCount;
    const task = new Task(description, id);
    this.#todo.add(task);
    this.#incrementCount();
  }

  get sortedByAlphabetical() {
    return this.#todo.sortByAlphabetical();
  }

  get sortedByCompletion() {
    return this.#todo.sortByStatus();
  }

  get todo() {
    const todo = this.#todo.allTasks;
    return [...todo];
  }
}

const render = (todoContainer, todoController, todo) => {
  while (todoContainer.firstChild) {
    todoContainer.removeChild(todoContainer.firstChild);
  }

  todo.forEach((task) => {
    const { description, taskCompleted, id } = task;
    const taskElement = createTaskElement(description, id);
    taskElement.onclick = (e) => {
      toggleStatus(e.target.id, todoController, todoContainer);
    };
    if (taskCompleted) {
      taskElement.classList.add("marked");
    } else {
      taskElement.classList.remove("marked");
    }
    todoContainer.appendChild(taskElement);
  });
};

const toggleStatus = (id, todoController, todoContainer) => {
  todoController.toggleStatus(Number(id));
  const todo = [...todoController.todo];
  render(todoContainer, todoController, todo);
};

const sortTaskAlphabetical = (todoContainer, todoController, sortStatus) => {
  const todo = todoController.sortedByAlphabetical;
  render(todoContainer, todoController, todo);
  sortStatus.innerText = "Alphabetical";
};

const createTask = (todoContainer, taskDetails, todoController) => {
  const description = taskDetails.value;
  todoController.addTask(description);
  const todo = [...todoController.todo];
  render(todoContainer, todoController, todo);
  taskDetails.value = "";
};

const sortByDate = (todoContainer, todoController, sortStatus) => {
  const todo = [...todoController.todo];
  render(todoContainer, todoController, todo);
  sortStatus.innerText = "Added";
};

const sortByStatus = (todoContainer, todoController, sortStatus) => {
  const todo = todoController.sortedByCompletion;
  render(todoContainer, todoController, todo);
  sortStatus.innerText = "Status";
};

const main = () => {
  const addTask = document.querySelector("#add-task");
  const todoContainer = document.querySelector("#todo-list");
  const taskDetails = document.querySelector("#task-details");
  const sortButton = document.querySelector("#sort-button");
  const sortByDateButton = document.querySelector("#sort-by-added");
  const sortStatus = document.querySelector("#sort-status");
  const sortByStatusButton = document.querySelector("#sort-by-completion");
  const todo = new Todo();
  const todoController = new TodoController(todo);

  sortButton.onclick = () => {
    sortTaskAlphabetical(todoContainer, todoController, sortStatus);
  };

  sortByDateButton.onclick = () => {
    sortByDate(todoContainer, todoController, sortStatus);
  };

  sortByStatusButton.onclick = () => {
    sortByStatus(todoContainer, todoController, sortStatus);
  };

  addTask.onclick = () => {
    createTask(todoContainer, taskDetails, todoController);
  };
};

window.onload = main;
