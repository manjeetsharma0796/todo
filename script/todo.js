class Todo {
  #tasks;
  #taskCount;

  constructor(title, todoID) {
    this.title = title;
    this.todoID = todoID;
    this.#taskCount = 0;
    this.#tasks = [];
  }

  #incrementTaskCount() {
    this.#taskCount += 1;
  }
  sortAlphabetical() {
    this.#tasks.sort((task1, task2) =>
      task1.description < task2.description ? -1 : 1
    );
  }

  sortByCreation() {
    this.#tasks.sort((task1, task2) => task1.taskID - task2.taskID);
  }

  sortByCompletion() {
    this.#tasks.sort((task1, task2) =>
      task1.isTaskCompleted < task2.isTaskCompleted ? -1 : 1
    );
  }

  addTask(description) {
    const taskID = this.#taskCount;
    const task = new Task(description, taskID);
    this.#tasks.push(task);
    this.#incrementTaskCount();
  }

  deleteTask(taskID) {
    this.#tasks = this.#tasks.filter(
      (task) => taskID !== task.getDetails().taskID
    );
  }

  findTask(taskID) {
    return this.#tasks.find((task) => taskID === task.getDetails().taskID);
  }

  toggleStatus(taskID) {
    const task = this.findTask(taskID);
    task.toggle();
  }

  getDetails() {
    const title = this.title;
    const todoID = this.todoID;
    const tasks = this.#tasks.reduce(
      (tasksDetails, task) => tasksDetails.concat(task.getDetails()),
      []
    );

    console.log(tasks);
    return { todoID, title, tasks };
  }
}