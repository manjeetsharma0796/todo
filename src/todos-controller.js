class TodosController {
  #todos;
  #todoAppStorage;

  constructor(todos, todoAppStorage) {
    this.#todos = todos;
    this.#todoAppStorage = todoAppStorage;
  }

  patchTaskStatus(taskID, todoID, taskStatus, responseHandlers) {
    this.#todos.patchTaskStatus(taskID, todoID, taskStatus);
    this.#todoAppStorage.store(this.getDetails(), responseHandlers);
  }

  addTodo(title, responseHandlers) {
    this.#todos.addTodo(title);
    this.#todoAppStorage.store(this.getDetails(), responseHandlers);
  }

  addTask(description, todoID, isTaskCompleted, responseHandlers) {
    this.#todos.addTask(description, todoID, isTaskCompleted);
    this.#todoAppStorage.store(this.getDetails(), responseHandlers);
  }

  deleteTask(taskID, todoID, responseHandlers) {
    this.#todos.deleteTask(taskID, todoID);
    this.#todoAppStorage.store(this.getDetails(), responseHandlers);
  }

  restoreTodos(todosDetails) {
    todosDetails.forEach((todo) => {
      const { todoID, title, tasks } = todo;
      this.#todos.restoreTodo(title, todoID);
      this.#todos.restoreTasks(tasks, todoID);
    });
  }

  start() {
    const todosDetails = this.#todoAppStorage.todosSession;
    this.restoreTodos(todosDetails);
  }

  getSortedDetails() {
    return [...this.#todos.getSortedDetails()];
  }

  getDetails() {
    return [...this.#todos.getDetails()];
  }
}

module.exports = { TodosController };
