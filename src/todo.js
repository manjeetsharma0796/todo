const { Task } = require("./task");

class Todo {
  #title;
  #todoID;
  #taskCount;
  #tasks;

  constructor(title, todoID) {
    this.#title = title;
    this.#todoID = todoID;
    this.#taskCount = 0;
    this.#tasks = [];
  }

  #incrementTaskCount() {
    this.#taskCount += 1;
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

  patchTaskStatus(taskID, taskStatus) {
    const task = this.#findTask(taskID);
    task.patchStatus(taskStatus);
  }

  getDetails() {
    const tasks = this.#tasks.map((task) => task.getDetails());

    return { todoID: this.#todoID, title: this.#title, tasks };
  }
}

module.exports = { Todo };
