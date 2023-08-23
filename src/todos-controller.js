class TodosController {
  #todos;
  #todoAppStorage;

  constructor(todos, todoAppStorage) {
    this.#todos = todos;
    this.#todoAppStorage = todoAppStorage;
  }

  #store(todosDetails) {
    this.#todoAppStorage.store(todosDetails);
  }

  toggleStatus(taskID, todoID) {
    this.#todos.toggleStatus(taskID, todoID);
    this.#store(this.getDetails());
  }

  addTodo(title, onSuccess, onError) {
    this.#todos.addTodo(title);
    this.#todoAppStorage.store(this.getDetails(), onSuccess, onError);
  }

  addTask(description, todoID, isTaskCompleted = false) {
    this.#todos.addTask(description, todoID, isTaskCompleted);
    this.#store(this.getDetails());
  }

  deleteTask(taskID, todoID) {
    this.#todos.deleteTask(taskID, todoID);
    this.#store(this.getDetails());
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
