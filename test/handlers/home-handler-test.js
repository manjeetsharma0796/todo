const { describe, it } = require("node:test");
const request = require("supertest");

const { createApp } = require("../../src/router");

describe("serveHomePage", () => {
  it("should serve home page", (_, done) => {
    const app = createApp();

    request(app)
      .get("/")
      .expect(200)
      .expect("content-type", /text\/html/)
      .end(done);
  });
});
