class Task {
  #description;
  #isTaskCompleted;
  #taskID;

  constructor(description, taskID, isTaskCompleted) {
    this.#description = description;
    this.#isTaskCompleted = isTaskCompleted;
    this.#taskID = taskID;
  }

  patchStatus(taskStatus) {
    this.#isTaskCompleted = taskStatus;
  }

  getDetails() {
    return {
      description: this.#description,
      taskID: this.#taskID,
      isTaskCompleted: this.#isTaskCompleted,
    };
  }

  get description() {
    return this.#description;
  }

  get isTaskCompleted() {
    return this.#isTaskCompleted;
  }
}

module.exports = { Task };
