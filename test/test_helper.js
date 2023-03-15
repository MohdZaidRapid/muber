const mongoose = require("mongoose");

before((done) => {
  mongoose.connect("mongodb://localhost:27017/muber_test");
  mongoose.connection
    .once("open", () => done())
    .on("error", (err) => {
      console.warn("Warning", err);
    });
});

beforeEach(async () => {
  const { drivers } = mongoose.connection.collections;

  try {
    await drivers.drop();
    await drivers.createIndex({ "geometry.coordinates": "2dsphere" });
  } catch {}
});
