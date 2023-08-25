const { describe, it } = require("node:test");
const assert = require("assert");
const { Todo } = require("../../src/models/todo");

describe("Todo", () => {
  describe("getDetails", () => {
    it("should get todo details when no task added", () => {
      const todo = new Todo("Gym", 1);
      const expectedTodoDetails = {
        todoID: 1,
        title: "Gym",
        tasks: [],
      };

      assert.deepStrictEqual(todo.getDetails(), expectedTodoDetails);
    });
  });

  describe("addTask", () => {
    it("should add task to todo", () => {
      const todo = new Todo("Gym", 1);
      todo.addTask("20 pushups", false);

      const expectedTodoDetails = {
        todoID: 1,
        title: "Gym",
        tasks: [
          {
            taskID: 0,
            description: "20 pushups",
            isTaskCompleted: false,
          },
        ],
      };

      assert.deepStrictEqual(todo.getDetails(), expectedTodoDetails);
    });
  });

  describe("deleteTask", () => {
    it("should delete task from todo of provided taskID", () => {
      const todo = new Todo("Gym", 1);
      todo.addTask("20 pushups", false);
      todo.deleteTask(0);

      assert.deepStrictEqual(todo.getDetails(), {
        title: "Gym",
        todoID: 1,
        tasks: [],
      });
    });
  });

  describe("patchStatus", () => {
    it("should patch the task of provided taskID", () => {
      const todo = new Todo("Gym", 1);
      todo.addTask("20 pushups", false);
      todo.patchTaskStatus(0, true);
      const expectedTodoDetails = {
        todoID: 1,
        title: "Gym",
        tasks: [
          {
            taskID: 0,
            description: "20 pushups",
            isTaskCompleted: true,
          },
        ],
      };

      assert.deepStrictEqual(todo.getDetails(), expectedTodoDetails);
    });
  });
});
