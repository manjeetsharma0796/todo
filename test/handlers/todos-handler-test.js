const { describe, it } = require("node:test");
const request = require("supertest");
const fs = require("fs");

const { createApp } = require("../../src/router");
const { Todos } = require("../../src/models/todos");
const { TodoStorage } = require("../../src/models/todo-storage");
const { TodosController } = require("../../src/models/todos-controller");

const STORAGE_PATH = "./todos.json";

describe("GET /todos", () => {
  it("should handle and restore", (_, done) => {
    const todos = new Todos();
    const todoStorage = new TodoStorage(fs, STORAGE_PATH);
    const todosController = new TodosController(todos, todoStorage);

    const app = createApp(todosController);

    request(app).get("/todos").expect(200).end(done);
  });
});
