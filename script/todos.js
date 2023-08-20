class Todos {
  #todoCount;
  #todoList;
  #renderer;

  constructor(renderer) {
    this.#renderer = renderer;
    this.#todoCount = 0;
    this.#todoList = [];
  }

  #incrementTodoCount() {
    this.#todoCount += 1;
  }

  #findTodo(todoID) {
    return this.#todoList.find((todo) => todo.getDetails().todoID === todoID);
  }

  render() {
    localStorage.setItem("todosDetails", JSON.stringify(this.getDetails()));
    const callBacks = {
      addTask: (description, todoID) => this.#addTask(description, todoID),
      deleteTask: (taskID, todoID) => this.#deleteTask(taskID, todoID),
      toggleStatus: (taskID, todoID) => this.#toggleStatus(taskID, todoID),
      sortAlphabetical: (todoID) => this.#sortTaskAlphabetical(todoID),
      sortTaskByCreation: (todoID) => this.#sortTaskByCreation(todoID),
      sortTaskByCompletion: (todoID) => this.#sortTaskByCompletion(todoID),
    };

    this.#renderer.renderTodo(this.getDetails(), callBacks);
  }

  #addTask(description, todoID) {
    const todo = this.#findTodo(todoID);
    todo.addTask(description);
    this.#render();
  }

  addTodo(title) {
    const todoID = this.#todoCount;
    const todo = new Todo(title, todoID);
    this.#todoList.push(todo);
    this.#incrementTodoCount();
    this.#render();
  }

  #deleteTask(taskID, todoID) {
    const todo = this.#findTodo(todoID);
    todo.deleteTask(taskID);
    this.#render();
  }

  #toggleStatus(taskID, todoID) {
    const todo = this.#findTodo(todoID);
    todo.toggleStatus(taskID);
    this.#render();
  }

  #sortTaskAlphabetical(todoID) {
    const todo = this.#findTodo(todoID);
    todo.sortAlphabetical();
    this.#render();
  }

  #sortTaskByCreation(todoID) {
    const todo = this.#findTodo(todoID);
    todo.sortByCreation();
    this.#render();
  }

  #sortTaskByCompletion(todoID) {
    const todo = this.#findTodo(todoID);
    todo.sortByCompletion();
    this.#render();
  }

  getDetails() {
    const todos = this.#todoList.reduce(
      (todosDetails, todo) => todosDetails.concat(todo.getDetails()),
      []
    );

    return todos;
  }
}
