const request = require("supertest");
const app = require("../index.js");
const setCookie = require("set-cookie-parser");
const mongoose = require("mongoose");
const User = require("../api/models/user");
const Goal = require("../api/models/goal");
const Feed = require("../api/models/feed");

// Increase the timeout limit for testing
jest.setTimeout(20000);

// For storing user's cookie
let token = "";

beforeAll(async () => {
  await User.deleteMany({});
  await Goal.deleteMany({});
  await Feed.deleteMany({});
});

afterAll(async () => {
  // Avoid Jest open handle error
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 500));
});

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

describe("User creating his first public goal", () => {
  // Integration test for creating a goal
  const mockGoal = {
    title: "mock title",
    category: "Lifestyle",
    frequency: "5",
    period: "Weekly",
    publicity: true,
    timespan: "13",
  };

  test("Should be able to create a goal", async () => {
    await request(app)
      .post("/goal")
      .set("Cookie", "token=" + token.value)
      .send(mockGoal)
      .expect(200);
  });

  // Integration test for retrieving the goal just created
  const expectMockGoal = {
    title: "mock title",
    category: "Lifestyle",
    frequency: 5,
    period: "Weekly",
    publicity: true,
    timespan: 13,
  };

  let testGoalId = "";

  test("Should be able to retrieve the goal just created", async () => {
    const res = await request(app)
      .get("/goal")
      .set("Cookie", "token=" + token.value)
      .expect(200);
    testGoalId = res.body[0]._id;
    expect(res.body).toBeTruthy();
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toMatchObject(expectMockGoal);
  });

  // Integration test for retrieving the feed created by the creation of goal
  const expectMockFeed = {
    content: 'test has created "mock title" goal!',
  };

  test("Should be able to retrieve the feed created by the creation of goal", async () => {
    const res = await request(app)
      .get("/feed")
      .set("Cookie", "token=" + token.value)
      .expect(200);
    expect(res.body).toBeTruthy();
    expect(res.body[0]).toMatchObject(expectMockFeed);
  });

  test("Should be able to check in the goal", async () => {
    const res = await request(app)
      .put("/goal/check_in")
      .set("Cookie", "token=" + token.value)
      .send({ goal_id: testGoalId, check_in_time: 1 })
      .expect(200);
    console.log(res.body);
    expect(res.body).toBeTruthy();
  });
});
