const assert = require("assert");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../../app");

const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  it("Post to /api/drivers creates a new driver", (done) => {
    Driver.count().then((count) => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end(() => {
          Driver.count().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
});
