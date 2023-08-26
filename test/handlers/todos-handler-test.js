const { describe, it } = require("node:test");
const request = require("supertest");

const { createApp } = require("../../src/router");
const { Todos } = require("../../src/models/todos");
const { TodoStorage } = require("../../src/models/todo-storage");
const { TodosController } = require("../../src/models/todos-controller");

describe("GET /todos", () => {
  it("should handle and restore", (context, done) => {
    const todos = new Todos();

    const readFileSync = context.mock.fn(() => {
      return JSON.stringify([{ todoID: 0, title: "home", tasks: [] }]);
    });

    const existsSync = context.mock.fn(() => true);

    const mockFs = { readFileSync, existsSync };
    const todoStorage = new TodoStorage(mockFs);
    const todosController = new TodosController(todos, todoStorage);
    todosController.start();

    const app = createApp(todosController);

    request(app)
      .get("/todos")
      .expect(200)
      .end(done)
      .expect([{ todoID: 0, title: "home", tasks: [] }]);
  });
});
