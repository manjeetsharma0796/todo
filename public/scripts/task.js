/* eslint-disable no-unused-vars */
class Task {
  #description;
  #isTaskCompleted;
  #taskID;

  constructor(description, taskID, isTaskCompleted) {
    this.#description = description;
    this.#isTaskCompleted = isTaskCompleted;
    this.#taskID = taskID;
  }

  toggle() {
    this.#isTaskCompleted = !this.#isTaskCompleted;
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
