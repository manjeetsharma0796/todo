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
    return {
      description: this.description,
      taskID: this.taskID,
      isTaskCompleted: this.isTaskCompleted,
    };
  }
}
