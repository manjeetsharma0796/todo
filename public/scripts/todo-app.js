const setupCreateTodoButton = (createTodoButton, todosController) => {
  createTodoButton.onclick = () => {
    const todoTitleElement = document.querySelector("#todo-title");
    const todoTitle = todoTitleElement.value;
    todosController.addTodo(todoTitle);
    todoTitleElement.value = "";
  };
};

const main = () => {
  const todosContainer = document.querySelector("#todos");
  const createTodoButton = document.querySelector("#create-todo");

  const renderer = new Renderer(todosContainer);
  const todoAppStorage = new TodoAppStorage();
  const todos = new Todos();
  const webClient = new WebClient();
  const todosController = new TodosController(
    todos,
    renderer,
    todoAppStorage,
    webClient
  );
  setupCreateTodoButton(createTodoButton, todosController);
  todosController.start();
};

window.onload = main;
