class Todo {
  #title;
  #todoID;
  #taskCount;
  #tasks;
  #sortBy;

  constructor(title, todoID) {
    this.#title = title;
    this.#todoID = todoID;
    this.#taskCount = 0;
    this.#tasks = [];
    this.#sortBy = this.#sortByCreation;
  }

  #incrementTaskCount() {
    this.#taskCount += 1;
  }

  #sortAlphabetical() {
    return this.#tasks.toSorted((task1, task2) =>
      task1.description < task2.description ? -1 : 1
    );
  }

  #sortByCreation() {
    return this.#tasks;
  }

  #sortByCompletion() {
    return this.#tasks.toSorted((task1, task2) =>
      task1.isTaskCompleted < task2.isTaskCompleted ? -1 : 1
    );
  }

  setSortBy(sortBy) {
    const sorts = {
      sortAlphabetical: this.#sortAlphabetical,
      sortByCreation: this.#sortByCreation,
      sortByCompletion: this.#sortByCompletion,
    };

    if (sortBy in sorts) {
      this.#sortBy = sorts[sortBy];
    }
  }

  addTask(description, isTaskCompleted) {
    const taskID = this.#taskCount;
    const task = new Task(description, taskID, isTaskCompleted);
    this.#tasks.push(task);
    this.#incrementTaskCount();
  }

  deleteTask(taskID) {
    this.#tasks = this.#tasks.filter(
      (task) => taskID !== task.getDetails().taskID
    );
  }

  #findTask(taskID) {
    return this.#tasks.find((task) => taskID === task.getDetails().taskID);
  }

  toggleStatus(taskID) {
    const task = this.#findTask(taskID);
    task.toggle();
  }

  getSortedDetails() {
    const tasks = this.#sortBy().reduce(
      (tasksDetails, task) => tasksDetails.concat(task.getDetails()),
      []
    );

    return { todoID: this.#todoID, title: this.#title, tasks };
  }

  getDetails() {
    const tasks = this.#tasks.reduce(
      (tasksDetails, task) => tasksDetails.concat(task.getDetails()),
      []
    );

    return { todoID: this.#todoID, title: this.#title, tasks };
  }
}
