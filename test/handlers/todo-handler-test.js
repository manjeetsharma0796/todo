const { describe, it, beforeEach } = require("node:test");
const request = require("supertest");
const fs = require("fs");

const { createApp } = require("../../src/router");
const { Todos } = require("../../src/models/todos");
const { TodoStorage } = require("../../src/models/todo-storage");
const { TodosController } = require("../../src/models/todos-controller");
const STORAGE_PATH = "./todos.json";

let app = null;

const setupController = () => {
  const todos = new Todos();
  const todoStorage = new TodoStorage(fs, STORAGE_PATH);
  const todosController = new TodosController(todos, todoStorage);

  app = createApp(todosController);
};

describe("handleAddTodo", async () => {
  beforeEach(() => setupController());
  it("should handle and add new todo by provided title", (_, done) => {
    request(app)
      .post("/todos/todo")
      .send({ title: "home" })
      .expect(201)
      .end(done);
  });

  it("should not create new todo if title is missing", (_, done) => {
    request(app).post("/todos/todo").send({ t: "home" }).expect(500).end(done);
  });
});
