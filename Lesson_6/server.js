const path = require("path");
const config = require("./config");

const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

const connection = require("./DBConnection");
const poolConnection = connection.poolConnection;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const templating = require("consolidate");
const handlebars = require("handlebars");
templating.requires.handlebars = handlebars;
app.engine("hbs", templating.handlebars);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "hbs");

handlebars.registerHelper(
  "selectedPriority",
  function (option, currentPriority) {
    return option === currentPriority;
  }
);

const session = require("express-session");
const sessionStore = new (require("express-mysql-session")(session))(
  {},
  poolConnection
);

const sessionMiddleware = session({
  store: sessionStore,
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600000 },
});

app.use(sessionMiddleware);

const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: "http://localhost:3000/auth/googleCallback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

const router = require("./routers");

app.use(router);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => console.log("Listening on port 3000"));
