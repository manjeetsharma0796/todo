class Todos {
  #todoCount;
  #todoList;
  #renderer;
  #todoAppStorage;

  constructor(renderer, todoAppStorage) {
    this.#renderer = renderer;
    this.#todoAppStorage = todoAppStorage;
    this.#todoCount = 0;
    this.#todoList = [];
  }

  #incrementTodoCount() {
    this.#todoCount += 1;
  }

  #findTodo(todoID) {
    return this.#todoList.find((todo) => todo.getDetails().todoID === todoID);
  }

  #store(todosDetails) {
    this.#todoAppStorage.store(todosDetails);
  }

  render(todosDetails) {
    this.#store(todosDetails);

    const callBacks = {
      addTask: (description, todoID, isTaskCompleted = false, taskID) => {
        this.#addTask(description, todoID, isTaskCompleted, taskID);
      },
      deleteTask: (taskID, todoID) => this.#deleteTask(taskID, todoID),
      toggleStatus: (taskID, todoID) => this.#toggleStatus(taskID, todoID),
      sortAlphabetical: (todoID) => this.#sortTaskAlphabetical(todoID),
      sortTaskByCreation: (todoID) => this.#sortTaskByCreation(todoID),
      sortTaskByCompletion: (todoID) => this.#sortTaskByCompletion(todoID),
    };

    this.#renderer.renderTodo(todosDetails, callBacks);
  }

  #addTask(description, todoID, isTaskCompleted = false, taskID) {
    const todo = this.#findTodo(todoID);
    todo.addTask(description, isTaskCompleted, taskID);
    this.render(this.getDetails());
  }

  addTodo(title, oldTodoID) {
    let todoID = oldTodoID;
    if (!oldTodoID) {
      todoID = this.#todoCount;
      this.#incrementTodoCount();
    }

    const todo = new Todo(title, todoID);
    this.#todoList.push(todo);
    this.render(this.getDetails());
  }

  #deleteTask(taskID, todoID) {
    const todo = this.#findTodo(todoID);
    todo.deleteTask(taskID);
    this.render(this.getDetails());
  }

  #toggleStatus(taskID, todoID) {
    const todo = this.#findTodo(todoID);
    todo.toggleStatus(taskID);
    this.render(this.getDetails());
  }

  #sortTaskAlphabetical(todoID) {
    const todo = this.#findTodo(todoID);
    todo.sortAlphabetical();
    this.render(this.getDetails());
  }

  #sortTaskByCreation(todoID) {
    const todo = this.#findTodo(todoID);
    todo.sortByCreation();
    this.render(this.getDetails());
  }

  #sortTaskByCompletion(todoID) {
    const todo = this.#findTodo(todoID);
    todo.sortByCompletion();
    this.render(this.getDetails());
  }

  restoreTodo(title, todoID) {
    this.addTodo(title, todoID);
  }

  restoreTasks(tasks, todoID) {
    const todo = this.#findTodo(todoID);

    tasks.forEach((task) => {
      const { taskID, description, isTaskCompleted } = task;
      todo.updateTaskCount(taskID);
      this.#addTask(description, todoID, isTaskCompleted, taskID);
    });
  }

  updateTodoCount(todoID) {
    this.#todoCount = this.#todoCount <= todoID ? todoID + 1 : this.#todoCount;
  }

  #restore(todosDetails) {
    todosDetails.forEach((todo) => {
      const { todoID, title, tasks } = todo;
      this.updateTodoCount(todoID);
      this.restoreTodo(title, todoID);
      this.restoreTasks(tasks, todoID);
    });
  }

  start() {
    const todosDetails = this.#todoAppStorage.todosSession;
    this.#restore(todosDetails);
    this.render(todosDetails);
  }

  getDetails() {
    const todos = this.#todoList.reduce(
      (todosDetails, todo) => todosDetails.concat(todo.getDetails()),
      []
    );

    return todos;
  }
}
