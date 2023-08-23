class TodosController {
  #todos;
  #renderer;
  #todoAppStorage;
  #webClient;

  constructor(todos, renderer, todoAppStorage, webClient) {
    this.#todos = todos;
    this.#renderer = renderer;
    this.#todoAppStorage = todoAppStorage;
    this.#webClient = webClient;
  }

  #store(todosDetails) {
    this.#todoAppStorage.store(todosDetails);
  }

  #toggleStatus(taskID, todoID) {
    this.#todos.toggleStatus(taskID, todoID);
    this.#store(this.getDetails());
    this.#renderer.renderTodo(this.getSortedDetails());
  }

  #sortTaskAlphabetical(todoID) {
    this.#todos.sortTaskAlphabetical(todoID);
    this.#store(this.getDetails());
    this.#renderer.renderTodo(this.getSortedDetails());
  }

  #sortTaskByCreation(todoID) {
    this.#todos.sortTaskByCreation(todoID);
    this.#store(this.getDetails());
    this.#renderer.renderTodo(this.getSortedDetails());
  }

  #sortTaskByCompletion(todoID) {
    this.#todos.sortTaskByCompletion(todoID);
    this.#store(this.getDetails());
    this.#renderer.renderTodo(this.getSortedDetails());
  }

  addTodo(title) {
    this.#webClient.addTodo(title, () => {
      this.#todos.addTodo(title);
      this.#store(this.getDetails());
      this.#renderer.renderTodo(this.getSortedDetails());
    });
  }

  #addTask(description, todoID, isTaskCompleted = false) {
    this.#todos.addTask(description, todoID, isTaskCompleted);
    this.#store(this.getDetails());
    this.#renderer.renderTodo(this.getSortedDetails());
  }

  #deleteTask(taskID, todoID) {
    this.#todos.deleteTask(taskID, todoID);
    this.#store(this.getDetails());
    this.#renderer.renderTodo(this.getSortedDetails());
  }

  #restoreTodos(todosDetails) {
    todosDetails.forEach((todo) => {
      const { todoID, title, tasks } = todo;
      this.#todos.restoreTodo(title, todoID);
      this.#todos.restoreTasks(tasks, todoID);
    });
  }

  #setListeners() {
    const listeners = {
      addTask: (description, todoID, isTaskCompleted = false) =>
        this.#addTask(description, todoID, isTaskCompleted),
      deleteTask: (taskID, todoID) => this.#deleteTask(taskID, todoID),
      toggleStatus: (taskID, todoID) => this.#toggleStatus(taskID, todoID),
      sortAlphabetical: (todoID) => this.#sortTaskAlphabetical(todoID),
      sortTaskByCreation: (todoID) => this.#sortTaskByCreation(todoID),
      sortTaskByCompletion: (todoID) => this.#sortTaskByCompletion(todoID),
    };

    this.#renderer.setListeners(listeners);
  }

  start() {
    const todosDetails = this.#todoAppStorage.todosSession;
    this.#setListeners();
    this.#restoreTodos(todosDetails);
    // this.#store(this.getDetails());
    this.#renderer.renderTodo(this.getSortedDetails());
  }

  getSortedDetails() {
    return [...this.#todos.getSortedDetails()];
  }

  getDetails() {
    return [...this.#todos.getDetails()];
  }
}
