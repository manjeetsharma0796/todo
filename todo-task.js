const createTaskElement = (description, id) => {
  const taskElement = document.createElement("p");
  taskElement.setAttribute("id", id);
  taskElement.innerText = description;
  return taskElement;
};

const sortTaskAlphabetical = (todoController, sortBy) => {
  todoController.sortByAlphabetical();
  sortBy.innerText = "A-Z";
};

const createTask = (taskDetails, todoController) => {
  const description = taskDetails.value;
  todoController.addTask(description);
  taskDetails.value = "";
};

const sortByDate = (todoController, sortBy) => {
  todoController.sortByDate();
  sortBy.innerText = "Date";
};

const sortByStatus = (todoController, sortBy) => {
  todoController.sortByStatus();
  sortBy.innerText = "Status";
};

const main = () => {
  const addTask = document.querySelector("#add-task");
  const todoContainer = document.querySelector("#todo-list");
  const taskDetails = document.querySelector("#task-details");
  const sortButton = document.querySelector("#sort-button");
  const sortByDateButton = document.querySelector("#sort-by-date");
  const sortBy = document.querySelector("#sort-by");
  const sortByStatusButton = document.querySelector("#sort-by-status");
  const todo = new Todo();
  const renderer = new Renderer(todoContainer);
  const todoController = new TodoController(todo, renderer);

  sortButton.onclick = () => {
    sortTaskAlphabetical(todoController, sortBy);
  };

  sortByDateButton.onclick = () => {
    sortByDate(todoController, sortBy);
  };

  sortByStatusButton.onclick = () => {
    sortByStatus(todoController, sortBy);
  };

  addTask.onclick = () => {
    createTask(taskDetails, todoController);
  };
};

window.onload = main;
