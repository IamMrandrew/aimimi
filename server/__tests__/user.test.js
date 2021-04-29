const request = require("supertest");
const app = require("../index.js");
const User = require("../api/models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const setCookie = require("set-cookie-parser");
const mongoose = require("mongoose");

// Increase the timeout limit for testing
jest.setTimeout(20000);

beforeAll(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  // Avoid Jest open handle error
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 500));
});

describe("User actions", () => {
  // Integration test for sign up a user
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

  // Integration test for login
  test("Shoule be able to login", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({
        email: "test@gmail.com",
        password: "12345",
      })
      .expect(200);
  });

  test("Shoule be unable to login with invalid password", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({
        email: "test@gmail.com",
        password: "invalid",
      })
      .expect(401);
  });

  test("Shoule be unable to login with invalid accound", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({
        email: "invalid@gmail.com",
        password: "12345",
      })
      .expect(401);
  });
});

describe("Admin actions", () => {
  beforeAll(async () => {
    await createAdminAccount();
  });

  // Preparation account for the integration test for a admin
  const createAdminAccount = () => {
    return new Promise((resolve, reject) => {
      bcrypt.hash("12345", 10, async (err, hash) => {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          randomString: crypto.randomBytes(16).toString("hex"),
          isValid: true,
          role: "Admin",
          username: "admin",
          email: "admin@gmail.com",
          password: hash,
          joinDate: Date.now(),
          propic: "image.jpg",
        });
        await user.save();
        resolve(true);
      });
    });
  };

  // Integration test for a admin login
  let token = "";

  test("Shoule be able to login admin account", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({
        email: "admin@gmail.com",
        password: "12345",
      })
      .expect(200);
    const cookies = setCookie.parse(res);
    token = cookies[0];
  });

  // Integration test for admin retrieving the users
  let testUserId = "";
  test("Should be able to retrieve the users ", async () => {
    const res = await request(app)
      .get("/user/all")
      .set("Cookie", "token=" + token.value)
      .expect(200);

    testUserId = res.body[0]._id;
    expect(res.body).toBeTruthy();
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toMatchObject({
      username: "test",
      email: "test@gmail.com",
    });
    expect(res.body[1]).toMatchObject({
      username: "admin",
      email: "admin@gmail.com",
    });
  });

  // Integration test for admin delete a user
  test("Should be able to delete a user ", async () => {
    const res = await request(app)
      .delete("/user/" + testUserId)
      .set("Cookie", "token=" + token.value)
      .expect(200);
    expect(res.body).toBeTruthy();
  });
});
