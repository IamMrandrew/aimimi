const mongoose = require('mongoose');
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("successful connection");
});

const dbName = "cluster0";
                      
 
const express = require('express');
const app = express();
// handle ALL requests
app.all('/*', function (req, res) {
// send this to client
res.send("Hello World!");
});
// listen to port 3000
const server = app.listen(process.env.PORT);