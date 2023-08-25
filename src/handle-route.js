const express = require("express");

const { logRequest } = require("./middlewares/request-logger");

const { serveHomePage } = require("./handlers/home-handler");
const {
  handleAddTask,
  handleDeleteTask,
  handleToggleTask,
} = require("./handlers/task-handler");
const { handleAddTodo } = require("./handlers/todo-handler");
const { handleRestore } = require("./handlers/todos-handler");

const createAndSetupApp = (todoController) => {
  const app = express();
  app.todoController = todoController;

  app.use(logRequest);
  app.use(express.json());

  app.get("/todos", handleRestore);
  app.get("/", serveHomePage);
  app.post("/todos/todo", handleAddTodo);
  app.post("/todos/todo/:todoID/task", handleAddTask);
  app.patch("/todos/todo/:todoID/task/:taskID", handleToggleTask);
  app.delete("/todos/todo/:todoID/task/:taskID", handleDeleteTask);
  app.use(express.static("public"));

  return app;
};

module.exports = { createAndSetupApp };
