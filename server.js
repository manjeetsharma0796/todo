const fs = require("fs");

const { Todos } = require("./src/todos");
const { TodoStorage } = require("./src/todo-storage");
const { TodosController } = require("./src/todos-controller");

const { createAndSetupApp } = require("./src/handle-route");
const STORAGE_PATH = "./todos.json";

const main = () => {
  const todos = new Todos();
  const todoStorage = new TodoStorage(fs, STORAGE_PATH);
  const todoController = new TodosController(todos, todoStorage);
  const app = createAndSetupApp(todoController);
  const port = 8000;

  app.listen(port, () => console.log("Listening on", port));
};

main();
