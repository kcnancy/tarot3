// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const path = require("path");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8081;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Handlebars
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Index route loads signup
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "/views/index.handlebars"));
});

// Requiring our controllers
require("./config/controllers/signupCont")(app);
require("./config/controllers/loginCont")(app);
require("./config/controllers/homeCont")(app);
require("./config/controllers/logoutCont")(app);
require("./config/controllers/userdata")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
