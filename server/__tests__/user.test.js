const request = require("supertest");
const app = require("../index.js");

// test("Should sign up for a user", async () => {
//   await request(app)
//     .post("/user/signup")
//     .send({
//       email: "test@gmail.com",
//       password: "12345",
//       username: "test",
//     })
//     .expect(201);
// });

test("login", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "test@gmail.com",
      password: "12345",
    })
    .expect(200);
});

jest.setTimeout(30000);
