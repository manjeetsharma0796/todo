const { Todo } = require("./todo");

class Todos {
  #todoCount;
  #todoList;

  constructor() {
    this.#todoCount = 0;
    this.#todoList = [];
  }

  #incrementTodoCount() {
    this.#todoCount += 1;
  }

  #findTodo(todoID) {
    return this.#todoList.find((todo) => todo.getDetails().todoID === todoID);
  }

  addTask(description, todoID, isTaskCompleted) {
    const todo = this.#findTodo(todoID);
    todo.addTask(description, isTaskCompleted);
  }

  addTodo(title) {
    const todoID = this.#todoCount;
    const todo = new Todo(title, todoID);

    this.#todoList.push(todo);
    this.#incrementTodoCount();
  }

  deleteTask(taskID, todoID) {
    const todo = this.#findTodo(todoID);
    todo.deleteTask(taskID);
  }

  patchTaskStatus(taskID, todoID, taskStatus) {
    const todo = this.#findTodo(todoID);
    todo.patchTaskStatus(taskID, taskStatus);
  }

  restoreTasks(tasks, todoID) {
    tasks.forEach((task) => {
      const { description, isTaskCompleted } = task;
      this.addTask(description, todoID, isTaskCompleted);
    });
  }

  getDetails() {
    return this.#todoList.map((todo) => todo.getDetails());
  }
}

module.exports = { Todos };
