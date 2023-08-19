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
    this.#renderer.render(tasks, () => this.cb(id));
  }

  addTask(description) {
    const id = this.#taskCount;
    const task = new Task(description, id);
    this.#todo.add(task);
    const tasks = this.#todo.allTasks;
    this.#renderer.render(tasks, () => this.cb(id));
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
