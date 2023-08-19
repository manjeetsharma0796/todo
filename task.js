class Task {
  constructor(description, id) {
    this.description = description;
    this.isTaskCompleted = false;
    this.id = id;
  }

  toggle() {
    this.isTaskCompleted = !this.isTaskCompleted;
  }
}
