const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  }

  // Setup store 
const mongoDBstore = new MongoDBStore({
  uri: process.env.MONGODB_URI || "mongodb://localhost/momentousv2", 
  collection: "sessions"
})
  
//Setup sessions
app.use(session({
    secret: 'This is a secret', //SESS_SECRET
    resave: true,
    saveUninitialized: true, //false
    store: mongoDBstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/momentousv2",
{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,   useFindAndModify: false });

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
