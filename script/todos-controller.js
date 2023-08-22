class TodosController {
  constructor(todos, renderer, todoAppStorage) {
    this.todos = todos;
    this.renderer = renderer;
    this.todoAppStorage = todoAppStorage;
  }

  toggleStatus(taskID, todoID) {
    this.todos.toggleStatus(taskID, todoID);
    this.render(this.getDetails());
  }

  sortTaskAlphabetical(todoID) {
    this.todos.sortTaskAlphabetical(todoID);
    this.render(this.getDetails());
  }

  sortTaskByCreation(todoID) {
    this.todos.sortTaskByCreation(todoID);
    this.render(this.getDetails());
  }

  sortTaskByCompletion(todoID) {
    this.todos.sortTaskByCompletion(todoID);
    this.render(this.getDetails());
  }

  addTodo(title, oldTodoID) {
    this.todos.addTodo(title, oldTodoID);
    this.render(this.getDetails());
  }

  addTask(description, todoID, isTaskCompleted = false, taskID) {
    this.todos.addTask(description, todoID, isTaskCompleted, taskID);
    this.render(this.getDetails());
  }

  deleteTask(taskID, todoID) {
    this.todos.deleteTask(taskID, todoID);
    this.render(this.getDetails());
  }

  store(todosDetails) {
    this.todoAppStorage.store(todosDetails);
  }

  restore(todosDetails) {
    todosDetails.forEach((todo) => {
      const { todoID, title, tasks } = todo;
      this.todos.restoreTodo(title, todoID);
      this.todos.updateTodoCount(todoID);
      this.todos.restoreTasks(tasks, todoID);
    });
  }

  render(todosDetails) {
    this.store(todosDetails);
    this.renderer.renderTodo(todosDetails);
  }

  setListeners() {
    const listeners = {
      addTask: (description, todoID, isTaskCompleted = false, taskID) =>
        this.addTask(description, todoID, isTaskCompleted, taskID),
      deleteTask: (taskID, todoID) => this.deleteTask(taskID, todoID),
      toggleStatus: (taskID, todoID) => this.toggleStatus(taskID, todoID),
      sortAlphabetical: (todoID) => this.sortTaskAlphabetical(todoID),
      sortTaskByCreation: (todoID) => this.sortTaskByCreation(todoID),
      sortTaskByCompletion: (todoID) => this.sortTaskByCompletion(todoID),
    };
    this.renderer.setListeners(listeners);
  }

  start() {
    const todosDetails = this.todoAppStorage.todosSession;
    this.setListeners();
    this.restore(todosDetails);
    this.render(todosDetails);
  }

  getDetails() {
    return [...this.todos.getDetails()];
  }
}
