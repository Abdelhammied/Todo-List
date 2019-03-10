/* -- -- -- -- Third Party Libraries -- -- -- -- */
const express = require("express");
const bodyParser = require("body-parser");
const sessions = require("express-session");
const mongoose = require("mongoose");
const edge = require("express-edge");
const csurf = require("csurf");
const MognoStore = require("connect-mongodb-session")(sessions);
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
/* -- -- -- -- Custome Includes -- -- -- -- */
const MONGO_URL = "mongodb://localhost:27017/todoList";
const MongoStoreINT = new MognoStore({
  uri: MONGO_URL,
  collection: "Sessions"
});
const routes = require("./app/routes/web");
const csrfProtection = csurf({ cookie: true });
/* -- -- -- -- App Config -- -- -- -- */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(edge);
app.set("views", "views");
app.use(
  sessions({
    secret: "12w5",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true
    }
  })
);
app.use(cookieParser());
app.use(flash());
app.use(csrfProtection);
app.use(routes);
mongoose
  .connect(MONGO_URL)
  .then(result => {
    console.log("Connected !...");
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
