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

class Task {
  constructor(description, id) {
    this.description = description;
    this.taskCompleted = false;
    this.id = id;
  }

  check() {
    this.taskCompleted = true;
  }

  uncheck() {
    this.taskCompleted = false;
  }
}

class Todo {
  #todo;

  constructor() {
    this.#todo = [];
  }

  sortByCompletion() {
    return this.#todo.toSorted((task1, task2) =>
      task1.taskCompleted < task2.taskCompleted ? 1 : -1
    );
  }

  add(task) {
    this.#todo.push(task);
  }

  get allTasks() {
    return [...this.#todo];
  }
}

class TodoController {
  #todo;
  #todoCount;

  constructor(todo) {
    this.#todo = todo;
    this.#todoCount = 0;
  }

  #incrementCount() {
    this.#todoCount++;
  }

  addTodo(description) {
    const id = this.#todoCount;
    const task = new Task(description, id);
    this.#todo.add(task);
    this.#incrementCount();
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

  get todo() {
    const todo = this.#todo.allTasks;
    return [...todo];
  }
}

const sortTaskAlphabetical = (todoContainer, todoController, sortStatus) => {
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

const render = (todoContainer, todoController) => {
  while (todoContainer.firstChild) {
    todoContainer.removeChild(todoContainer.firstChild);
  }
  const todo = todoController.todo;
  todo.forEach((task) => {
    const { description, _, id } = task;
    const taskElement = createTaskElement(description, id);
    addClickEvent(taskElement, todoController);
    todoContainer.appendChild(taskElement);
  });
};

const createTask = (todoContainer, taskDetails, todoController, todo) => {
  const description = taskDetails.value;
  todoController.addTodo(description);
  render(todoContainer, todoController, todo);
  taskDetails.value = "";
};

const sortByAdded = (todoContainer, todo, sortStatus, todoController) => {
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

  sortByCompletionButton.onclick = () => {
    sortByCompletion(todoContainer,todoController, sortStatus)
  };

  addTask.onclick = () => {
    createTask(todoContainer, taskDetails, todoController, todo);
  };
};

window.onload = main;
