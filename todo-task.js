class Task {
  constructor(description, id) {
    this.description = description;
    this.isTaskCompleted = false;
    this.id = id;
  }

  toggle() {
    this.isTaskCompleted = !this.isTaskCompleted;
  }
}

class Todo {
  #todo;

  constructor() {
    this.#todo = [];
  }

  sortAlphabetical() {
    return this.#todo.toSorted((task1, task2) =>
      task1.description < task2.description ? -1 : 1
    );
  }

  sortStatus() {
    return this.#todo.toSorted((task1, task2) =>
      task1.isTaskCompleted < task2.isTaskCompleted ? -1 : 1
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
  #renderer;
  #taskCount;

  constructor(todo, renderer) {
    this.#todo = todo;
    this.#renderer = renderer;
    this.#taskCount = 0;
  }

  toggleStatus(id) {
    this.#todo.toggleStatus(id);
  }

  #incrementCount() {
    this.#taskCount += 1;
  }

  cb(id) {
    this.toggleStatus(id);
    const tasks = this.#todo.allTasks;
    this.#renderer.render(tasks, (id) => this.cb(id));
  }

  addTask(description) {
    const id = this.#taskCount;
    const task = new Task(description, id);
    this.#todo.add(task);
    const tasks = this.#todo.allTasks;
    this.#renderer.render(tasks, (id) => this.cb(id));
    this.#incrementCount();
  }

  sortByAlphabetical() {
    const tasks = this.#todo.sortAlphabetical();
    this.#renderer.render(tasks, (id) => this.cb(id));
  }

  sortByStatus() {
    const tasks = this.#todo.sortStatus();
    this.#renderer.render(tasks, (id) => this.cb(id));
  }

  sortByDate() {
    const tasks = this.#todo.allTasks;
    this.#renderer.render(tasks, (id) => this.cb(id));
  }
}

class Renderer {
  constructor(todoContainer) {
    this.todoContainer = todoContainer;
  }

  #createTaskElement(description, isTaskCompleted, id, cb) {
    const taskElement = document.createElement("p");
    taskElement.id = id;
    taskElement.innerText = description;

    if (isTaskCompleted) {
      taskElement.classList.add("marked");
    }

    taskElement.onclick = () => {
      cb && cb(id);
    };
    return taskElement;
  }

  render(tasks, cb) {
    const todoContainer = this.todoContainer;
    todoContainer.replaceChildren();

    console.log(tasks, 'me from render');
    
    tasks.forEach(task => {
      const { description, isTaskCompleted, id } = task;
      const taskElement = this.#createTaskElement(
        description,
        isTaskCompleted,
        id,
        cb
      );

      todoContainer.appendChild(taskElement);
    });
  }
}

const createTaskElement = (description, id) => {
  const taskElement = document.createElement("p");
  taskElement.setAttribute("id", id);
  taskElement.innerText = description;
  return taskElement;
};

const sortTaskAlphabetical = (todoController, sortBy) => {
  todoController.sortByAlphabetical();
  sortBy.innerText = "A-Z";
};

const createTask = (taskDetails, todoController) => {
  const description = taskDetails.value;
  todoController.addTask(description);
  taskDetails.value = "";
};

const sortByDate = (todoController, sortBy) => {
  todoController.sortByDate();
  sortBy.innerText = "Date";
};

const sortByStatus = (todoController, sortBy) => {
  todoController.sortByStatus();
  sortBy.innerText = "Status";
};

const main = () => {
  const addTask = document.querySelector("#add-task");
  const todoContainer = document.querySelector("#todo-list");
  const taskDetails = document.querySelector("#task-details");
  const sortButton = document.querySelector("#sort-button");
  const sortByDateButton = document.querySelector("#sort-by-date");
  const sortBy = document.querySelector("#sort-by");
  const sortByStatusButton = document.querySelector("#sort-by-status");
  const todo = new Todo();
  const renderer = new Renderer(todoContainer);
  const todoController = new TodoController(todo, renderer);

  sortButton.onclick = () => {
    sortTaskAlphabetical( todoController, sortBy);
  };

  sortByDateButton.onclick = () => {
    sortByDate( todoController, sortBy);
  };

  sortByStatusButton.onclick = () => {
    sortByStatus( todoController, sortBy);
  };

  addTask.onclick = () => {
    createTask(taskDetails, todoController);
  };
};

window.onload = main;
