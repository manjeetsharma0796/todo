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

  sortByAlphabetical() {
    return this.#todo.toSorted((task1, task2) =>
      task1.description < task2.description ? -1 : 1
    );
  }

  sortByCompletion() {
    return this.#todo.toSorted((task1, task2) =>
      task1.taskCompleted < task2.taskCompleted ? 1 : -1
    );
  }

  add(task) {
    this.#todo.push(task);
  }

  toggleStatus(id) {
    const task = this.#todo[id];
    if (task.taskCompleted) {
      task.uncheck();
      return;
    }

    task.check();
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
    this.#taskCount++;
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
    return this.#todo.sortByCompletion();
  }

  get todo() {
    const todo = this.#todo.allTasks;
    return [...todo];
  }
}

const toggleStatus = (id, todoController, todoContainer) => {
  todoController.toggleStatus(+id);
  const todo = todoController.todo;
  render(todoContainer, todoController, todo);
};

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

const sortTaskAlphabetical = (todoContainer, todoController, sortStatus) => {
  const todo = todoController.sortedByAlphabetical;
  render(todoContainer, todoController, todo)
  sortStatus.innerText = "Alphabetical";
};

const createTask = (todoContainer, taskDetails, todoController) => {
  const description = taskDetails.value;
  todoController.addTask(description);
  const todo = todoController.todo;
  render(todoContainer, todoController, todo);
  taskDetails.value = "";
};

const sortByAdded = (todoContainer, todoController, sortStatus) => {
  const todo = todoController.todo;
  render(todoContainer, todoController, todo);
  sortStatus.innerText = "Added";
};

const sortByCompletion = (todoContainer, todoController, sortStatus) => {
  const todo = todoController.sortedByCompletion;
  render(todoContainer, todoController, todo);
  sortStatus.innerText = "Completion";
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
    sortByAdded(todoContainer, todoController, sortStatus);
  };

  sortByCompletionButton.onclick = () => {
    sortByCompletion(todoContainer, todoController, sortStatus);
  };

  addTask.onclick = () => {
    createTask(todoContainer, taskDetails, todoController);
  };
};

window.onload = main;
