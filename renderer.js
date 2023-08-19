class Renderer {
  constructor(todoContainer) {
    this.todoContainer = todoContainer;
  }

  #createTaskElement(description, isTaskCompleted, id, cb) {
    const taskElement = document.createElement("p");
    taskElement.id = id;
    taskElement.innerText = description;

    if (isTaskCompleted) {
      taskElement.classList.add("marked");
    }

    taskElement.onclick = () => {
      cb && cb(id);
    };
    return taskElement;
  }

  render(tasks, cb) {
    const todoContainer = this.todoContainer;
    todoContainer.replaceChildren();

    console.log(tasks, "me from render");

    tasks.forEach((task) => {
      const { description, isTaskCompleted, id } = task;
      const taskElement = this.#createTaskElement(
        description,
        isTaskCompleted,
        id,
        cb
      );

      todoContainer.appendChild(taskElement);
    });
  }
}
