const setupCreateTodoButton = (createTodoButton, todos) => {
  createTodoButton.onclick = () => {
    const todoTitleElement = document.querySelector("#todo-title");
    const todoTitle = todoTitleElement.value;
    todos.addTodo(todoTitle);
    todoTitleElement.value = "";
  };
};

const main = () => {
  const todosContainer = document.querySelector("#todos");
  const createTodoButton = document.querySelector("#create-todo");

  const renderer = new Renderer(todosContainer);
  const todoAppStorage = new TodoAppStorage();
  const todos = new Todos(renderer, todoAppStorage);
  setupCreateTodoButton(createTodoButton, todos);
  todos.start();
};

window.onload = main;
