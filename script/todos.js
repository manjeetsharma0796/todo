class Todos {
  constructor() {
    this.todoCount = 0;
    this.todoList = [];
  }

  #incrementTodoCount() {
    this.todoCount += 1;
  }

  #findTodo(todoID) {
    return this.todoList.find((todo) => todo.getDetails().todoID === todoID);
  }

  addTask(description, todoID, isTaskCompleted, taskID) {
    const todo = this.#findTodo(todoID);
    todo.addTask(description, isTaskCompleted, taskID);
  }

  addTodo(title, oldTodoID) {
    let todoID = oldTodoID;

    if (!oldTodoID) {
      todoID = this.todoCount;
      this.#incrementTodoCount();
    }

    const todo = new Todo(title, todoID);
    this.todoList.push(todo);
  }

  deleteTask(taskID, todoID) {
    const todo = this.#findTodo(todoID);
    todo.deleteTask(taskID);
  }

  toggleStatus(taskID, todoID) {
    const todo = this.#findTodo(todoID);
    todo.toggleStatus(taskID);
  }

  sortTaskAlphabetical(todoID) {
    const todo = this.#findTodo(todoID);
    todo.sortAlphabetical();
  }

  sortTaskByCreation(todoID) {
    const todo = this.#findTodo(todoID);
    todo.sortByCreation();
  }

  sortTaskByCompletion(todoID) {
    const todo = this.#findTodo(todoID);
    todo.sortByCompletion();
  }

  restoreTodo(title, todoID) {
    this.addTodo(title, todoID);
  }

  restoreTasks(tasks, todoID) {
    const todo = this.#findTodo(todoID);

    tasks.forEach((task) => {
      const { taskID, description, isTaskCompleted } = task;
      todo.updateTaskCount(taskID);
      todo.addTask(description);

      this.addTask(description, todoID, isTaskCompleted, taskID);
    });
  }

  updateTodoCount(todoID) {
    this.todoCount = this.todoCount <= todoID ? todoID + 1 : this.todoCount;
  }

  getDetails() {
    const todos = this.todoList.reduce(
      (todosDetails, todo) => todosDetails.concat(todo.getDetails()),
      []
    );

    return todos;
  }
}
