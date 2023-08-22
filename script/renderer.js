class Renderer {
  #todosContainer;

  constructor(todosContainer) {
    this.#todosContainer = todosContainer;
  }

  setListeners(listeners) {
    this.listeners = listeners;
  }

  #createTodoHeader(title) {
    const todoHeader = document.createElement("header");
    const todoName = document.createElement("h3");
    todoName.innerText = title;
    todoHeader.append(todoName);
    return todoHeader;
  }

  #createAddNewTaskSection(todoID) {
    const newTaskSection = document.createElement("section");
    newTaskSection.id = "input-section";
    newTaskSection.className = "flexRow";

    const newTaskInput = document.createElement("input");
    newTaskInput.type = "text";
    newTaskInput.placeholder = "Task-details";
    newTaskInput.id = "task-details";
    newTaskInput.className = "input";

    const newTaskButton = document.createElement("input");
    newTaskButton.type = "button";
    newTaskButton.value = "Add Task";
    newTaskButton.id = "add-task";
    newTaskButton.className = "input";
    newTaskButton.onclick = () => {
      const description = newTaskInput.value;
      this.listeners.addTask(description, todoID);
    };

    newTaskSection.append(newTaskInput, newTaskButton);
    return newTaskSection;
  }

  #createButton(type, value, id, className) {
    const button = document.createElement("input");
    button.type = type;
    button.value = value;
    button.id = id;
    button.className = className;

    return button;
  }

  #createSortSection(todoID) {
    const sortSection = document.createElement("section");
    sortSection.className = "flexRow";
    sortSection.id = "sort-options";

    const sortAlphabeticalButton = this.#createButton(
      "button",
      "A-Z",
      "sort-button",
      "input"
    );
    sortAlphabeticalButton.onclick = () => {
      this.listeners.sortAlphabetical(todoID);
    };

    const sortByCreationButton = this.#createButton(
      "button",
      "Date",
      "sort-by-date",
      "input"
    );
    sortByCreationButton.onclick = () => {
      this.listeners.sortTaskByCreation(todoID);
    };

    const sortStatusButton = this.#createButton(
      "button",
      "Status",
      "sort-by-status",
      "input"
    );
    sortStatusButton.onclick = () => {
      this.listeners.sortTaskByCompletion(todoID);
    };

    sortSection.append(
      sortAlphabeticalButton,
      sortByCreationButton,
      sortStatusButton
    );

    return sortSection;
  }

  #createTasksContainer() {
    const todoContainer = document.createElement("article");
    todoContainer.removeChild("");
    todoContainer.id = "todo-list";
    todoContainer.classList.add("scroll", "flexColumn");

    return todoContainer;
  }

  #createDeleteButton() {
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "delete";

    return deleteButton;
  }

  #createTaskElement({ description, isTaskCompleted, taskID, todoID }) {
    const taskElement = document.createElement("section");
    taskElement.classList.add("flexRow", "task");

    const task = document.createElement("p");
    task.innerText = description;

    if (isTaskCompleted) task.classList.add("marked");
    task.onclick = () => {
      this.listeners.toggleStatus(taskID, todoID);
    };

    const deleteButton = this.#createDeleteButton();
    deleteButton.onclick = () => {
      this.listeners.deleteTask(taskID, todoID);
    };

    taskElement.append(task, deleteButton);
    return taskElement;
  }

  #renderTasks({ tasksContainer, tasks, todoID }) {
    tasks.forEach((task) => {
      const taskElement = this.#createTaskElement({
        ...task,
        todoID,
      });

      tasksContainer.append(taskElement);
    });
  }

  #createTodoElement() {
    const todoElement = document.createElement("section");
    todoElement.classList.add("flexColumn", "main");

    return todoElement;
  }

  renderTodo(todosDetails) {
    this.#todosContainer.replaceChildren("");

    todosDetails.forEach((todoDetails) => {
      const { title, todoID, tasks } = todoDetails;

      const todoElement = this.#createTodoElement();
      const todoHeader = this.#createTodoHeader(title);

      const addNewTaskSection = this.#createAddNewTaskSection(todoID);

      const sortSection = this.#createSortSection(todoID);
      const tasksContainer = this.#createTasksContainer();

      this.#renderTasks({
        tasksContainer,
        tasks,
        todoID,
      });
      todoElement.append(
        todoHeader,
        addNewTaskSection,
        sortSection,
        tasksContainer
      );
      this.#todosContainer.append(todoElement);
    });
  }
}
