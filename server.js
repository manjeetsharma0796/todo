const fs = require("fs");

const { Todos } = require("./src/models/todos");
const { TodoStorage } = require("./src/models/todo-storage");
const { TodosController } = require("./src/models/todos-controller");

const { createApp } = require("./src/router");

const STORAGE_PATH = "./todos.json";

const main = () => {
  const todos = new Todos();
  const todoStorage = new TodoStorage(fs, STORAGE_PATH);
  const todoController = new TodosController(todos, todoStorage);
  todoController.start();

  const app = createApp(todoController);
  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log("Listening on", port));
};

main();
