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
