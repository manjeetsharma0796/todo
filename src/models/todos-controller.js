class TodosController {
  #todos;
  #todoAppStorage;

  constructor(todos, todoAppStorage) {
    this.#todos = todos;
    this.#todoAppStorage = todoAppStorage;
  }

  #restoreTodos(todosDetails) {
    todosDetails.forEach((todo) => {
      const { todoID, title, tasks } = todo;
      this.#todos.addTodo(title);
      this.#todos.restoreTasks(tasks, todoID);
    });
  }

  patchTaskStatus(taskID, todoID, taskStatus, responseHandlers) {
    this.#todos.patchTaskStatus(taskID, todoID, taskStatus);
    this.#todoAppStorage.store(this.#todos.getDetails(), responseHandlers);
  }

  addTodo(title, responseHandlers) {
    this.#todos.addTodo(title);
    this.#todoAppStorage.store(this.#todos.getDetails(), responseHandlers);
  }

  addTask(description, todoID, isTaskCompleted, responseHandlers) {
    this.#todos.addTask(description, todoID, isTaskCompleted);
    this.#todoAppStorage.store(this.#todos.getDetails(), responseHandlers);
  }

  deleteTask(taskID, todoID, responseHandlers) {
    this.#todos.deleteTask(taskID, todoID);
    this.#todoAppStorage.store(this.#todos.getDetails(), responseHandlers);
  }

  getDetails() {
    return this.#todos.getDetails();
  }

  start() {
    this.#todoAppStorage.restore((todosDetails) => {
      this.#restoreTodos(todosDetails);
    });
  }
}

module.exports = { TodosController };
