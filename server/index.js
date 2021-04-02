const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
var Store = require("express-session").Store;
var MongooseStore = require("mongoose-express-session")(Store);
require("dotenv").config();
const userRoutes = require("./api/routes/user");
const goalRoutes = require("./api/routes/goal");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("successful connection");
});

// handle ALL requests
app.all("/", function (req, res) {
  // send this to client
  res.send("Hello World!");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    store: new MongooseStore({
      connection: mongoose,
    }),
    saveUninitialized: true,
    cookie: { maxAge: 6000 * 1000 },
  })
);
app.use("/", userRoutes);
app.use("/", goalRoutes);
const server = app.listen(process.env.PORT);
