const { describe, it } = require("node:test");
const assert = require("assert");
const { Todos } = require("../../src/models/todos");

describe("Todos", () => {
  describe("getDetails", () => {
    it("should have no todos", () => {
      const todos = new Todos();
      const expectedTodosDetails = [];

      assert.deepStrictEqual(todos.getDetails(), expectedTodosDetails);
    });
  });

  describe("addTodo", () => {
    it("should create a todo", () => {
      const todos = new Todos();
      todos.addTodo("Gym");
      const expectedTodosDetails = [
        {
          todoID: 0,
          title: "Gym",
          tasks: [],
        },
      ];

      assert.deepStrictEqual(todos.getDetails(), expectedTodosDetails);
    });
  });

  describe("addTask", () => {
    it("should create task to provided todoID", () => {
      const todos = new Todos();
      todos.addTodo("Gym");
      const todoID = 0;
      todos.addTask("stretch", todoID, false);

      const expectedTodosDetails = [
        {
          todoID: 0,
          title: "Gym",
          tasks: [
            {
              description: "stretch",
              taskID: 0,
              isTaskCompleted: false,
            },
          ],
        },
      ];

      assert.deepStrictEqual(todos.getDetails(), expectedTodosDetails);
    });
  });

  describe("deleteTask", () => {
    it("should delete task to provided todoID", () => {
      const todos = new Todos();
      const todoID = 0;
      const taskID = 0;
      todos.addTodo("Gym");
      todos.addTask("stretch", todoID, false);
      todos.deleteTask(taskID, todoID);

      const expectedTodosDetails = [
        {
          todoID: 0,
          title: "Gym",
          tasks: [],
        },
      ];

      assert.deepStrictEqual(todos.getDetails(), expectedTodosDetails);
    });
  });

  describe("patchTaskStatus", () => {
    it("should patch task status to provided todoID", () => {
      const todos = new Todos();
      const todoID = 0;
      const taskID = 0;
      const taskStatus = true;

      todos.addTodo("Gym");
      todos.addTask("stretch", todoID, false);
      todos.patchTaskStatus(taskID, todoID, taskStatus);

      const expectedTodosDetails = [
        {
          todoID: 0,
          title: "Gym",
          tasks: [
            {
              description: "stretch",
              taskID: 0,
              isTaskCompleted: true,
            },
          ],
        },
      ];

      assert.deepStrictEqual(todos.getDetails(), expectedTodosDetails);
    });
  });

  describe("restoreTasks", () => {
    it("should restore tasks to provided todoID", () => {
      const todos = new Todos();
      const todoID = 0;

      const tasksToRestore = [
        {
          description: "stretch",
          taskID: 0,
          isTaskCompleted: false,
        },
      ];

      todos.addTodo("Gym");
      todos.restoreTasks(tasksToRestore, todoID);

      const expectedTodosDetails = [
        {
          todoID: 0,
          title: "Gym",
          tasks: [
            {
              description: "stretch",
              taskID: 0,
              isTaskCompleted: false,
            },
          ],
        },
      ];

      assert.deepStrictEqual(todos.getDetails(), expectedTodosDetails);
    });
  });
});
