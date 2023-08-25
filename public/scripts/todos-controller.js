/* eslint-disable no-unused-vars */
class TodosController {
  #todos;
  #renderer;
  #webClient;

  constructor(todos, renderer, webClient) {
    this.#todos = todos;
    this.#renderer = renderer;
    this.#webClient = webClient;
  }

  #toggleStatus(taskID, todoID) {
    const { isTaskCompleted } = this.#todos.getTaskDetails(todoID, taskID);

    this.#webClient.toggleStatus(taskID, todoID, !isTaskCompleted, () => {
      this.#todos.toggleStatus(taskID, todoID);
      this.#renderer.renderTodo(this.#todos.getSortedDetails());
    });
  }

  #sortTaskAlphabetical(todoID) {
    this.#todos.sortTaskAlphabetical(todoID);
    this.#renderer.renderTodo(this.#todos.getSortedDetails());
  }

  #sortTaskByCreation(todoID) {
    this.#todos.sortTaskByCreation(todoID);
    this.#renderer.renderTodo(this.#todos.getSortedDetails());
  }

  #sortTaskByCompletion(todoID) {
    this.#todos.sortTaskByCompletion(todoID);
    this.#renderer.renderTodo(this.#todos.getSortedDetails());
  }

  addTodo(title) {
    this.#webClient.addTodo(title, () => {
      this.#todos.addTodo(title);
      this.#renderer.renderTodo(this.#todos.getSortedDetails());
    });
  }

  #addTask(description, todoID, isTaskCompleted = false) {
    this.#webClient.addTask(description, todoID, () => {
      this.#todos.addTask(description, todoID, isTaskCompleted);
      this.#renderer.renderTodo(this.#todos.getSortedDetails());
    });
  }

  #deleteTask(taskID, todoID) {
    this.#webClient.deleteTask(taskID, todoID, () => {
      this.#todos.deleteTask(taskID, todoID);
      this.#renderer.renderTodo(this.#todos.getSortedDetails());
    });
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
    this.#setListeners();
    this.#webClient.restoreTodos((todosDetails) => {
      this.#restoreTodos(todosDetails);
      this.#renderer.renderTodo(this.#todos.getSortedDetails());
    });
  }
}
