const { describe, it } = require("node:test");
const assert = require("assert");

const { Task } = require("../../src/models/task");

describe("task", () => {
  describe("patchStatus", () => {
    it("should patch the provided status to task", () => {
      const description = "Read Book";
      const taskID = 1;
      const taskStatus = false;
      const task = new Task(description, taskID, taskStatus);

      task.patchStatus(true);
      assert.strictEqual(task.isTaskCompleted, true);
    });
  });

  describe("getDescription", () => {
    it("should get task description", () => {
      const description = "Read Book";
      const taskID = 1;
      const taskStatus = false;
      const task = new Task(description, taskID, taskStatus);

      assert.strictEqual(task.description, "Read Book");
    });
  });

  describe("getDetails", () => {
    it("should get task details", () => {
      const description = "Read Book";
      const taskID = 1;
      const taskStatus = false;
      const task = new Task(description, taskID, taskStatus);

      const expectedTaskDetails = {
        description: "Read Book",
        taskID: 1,
        isTaskCompleted: false,
      };

      assert.deepStrictEqual(task.getDetails(), expectedTaskDetails);
    });
  });
});
