const request = require("supertest");
const app = require("../index.js");
const User = require("../api/models/user");

// Increase the timeout limit for testing
jest.setTimeout(50000);

beforeAll(async () => {
  await User.deleteMany({});
});

test("Should sign up for a user", async () => {
  await request(app)
    .post("/user/signup")
    .send({
      email: "test@gmail.com",
      password: "12345",
      username: "test",
    })
    .expect(201);

  // mimic the verification action is done by user
  await User.findOneAndUpdate(
    { email: "test@gmail.com" },
    { $set: { isValid: true } }
  );
});

test("Shoule be able to login", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "test@gmail.com",
      password: "12345",
    })
    .expect(200);
});
