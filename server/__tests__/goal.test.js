const request = require("supertest");
const app = require("../index.js");
const setCookie = require("set-cookie-parser");
const User = require("../api/models/user");
const Goal = require("../api/models/goal");
const Feed = require("../api/models/feed");

// Increase the timeout limit for testing
jest.setTimeout(50000);

beforeAll(async () => {
  await User.deleteMany({});
  await Goal.deleteMany({});
  await Feed.deleteMany({});
});

// For storing user's cookie
let token = "";

// Perform user signup and login for testing the following APIs
test("Should sign up for a user", async () => {
  await request(app)
    .post("/user/signup")
    .send({
      email: "test@gmail.com",
      password: "12345",
      username: "test",
    })
    .expect(201);

  // mimic the verification action which should be done by user
  await User.findOneAndUpdate(
    { email: "test@gmail.com" },
    { $set: { isValid: true } }
  );
});

test("Shoule be able to login", async () => {
  const res = await request(app)
    .post("/user/login")
    .send({
      email: "test@gmail.com",
      password: "12345",
    })
    .expect(200);
  const cookies = setCookie.parse(res);
  token = cookies[0];
});

test("Should be able to create a goal", async () => {
  await request(app)
    .post("/goal")
    .set("Cookie", "token=" + token.value)
    .send({
      title: "mock title",
      category: "Lifestyle",
      frequency: "5",
      period: "Weekly",
      publicity: true,
      timespan: "13",
    })
    .expect(200);
});
