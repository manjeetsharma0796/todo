class Task {
  constructor(description, taskID, isTaskCompleted) {
    this.description = description;
    this.isTaskCompleted = isTaskCompleted;
    this.taskID = taskID;
  }

  toggle() {
    this.isTaskCompleted = !this.isTaskCompleted;
  }

  getDetails() {
    const description = this.description;
    const taskID = this.taskID;
    const isTaskCompleted = this.isTaskCompleted;

    return { description, taskID, isTaskCompleted };
  }
}
