const express = require("express");
const ROOT = "/Users/manjeet/workspace/html/assignment/todo-manjeetsharma0796";

const logRequest = (request, _, next) => {
  console.log(request.method, request.url);
  next();
};

const onSuccess = (_, res, status) => {
  res.status(status).end();
};

const onError = (_, res) => {
  res.status(500).end();
};

const serveHomePage = (_, res) => {
  const filePath = `${ROOT}/public/index.html`;
  res.sendFile(filePath);
};

const handleAddTodo = (req, res) => {
  const { todoController } = req.app;
  const resposneHandlers = {
    onSuccess: () => onSuccess(req, res, 201),
    onError: () => onError(req, res),
  };

  todoController.addTodo(req.body.title, resposneHandlers);
};

const handleAddTask = (req, res) => {
  const { todoController } = req.app;
  const responseHandlers = {
    onSuccess: () => onSuccess(req, res, 201),
    onError: () => onError(req, res),
  };

  todoController.addTask(
    req.body.description,
    parseInt(req.params.todoID),
    false,
    responseHandlers
  );
};

const handleDeleteTask = (req, res) => {
  const { todoController } = req.app;
  const { todoID, taskID } = req.params;
  const responseHandlers = {
    onSuccess: () => onSuccess(req, res, 204),
    onError: () => onError(req, res),
  };

  todoController.deleteTask(
    parseInt(taskID),
    parseInt(todoID),
    responseHandlers
  );
};

const createAndSetupApp = (todoController) => {
  const app = express();
  app.todoController = todoController;

  app.use(logRequest);
  app.use(express.json());

  app.get("/", serveHomePage);
  app.post("/todos/todo", handleAddTodo);
  app.post("/todos/todo/:todoID/task", handleAddTask);
  app.delete("/todos/todo/:todoID/task/:taskID", handleDeleteTask);
  app.use(express.static("public"));

  return app;
};

module.exports = { createAndSetupApp };
