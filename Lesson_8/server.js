const path = require("path");
const config = require("./config");

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

const sessionMiddleware = session({
  store: sessionStore,
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600000 },
});

app.use(sessionMiddleware);

io.use(wrap(sessionMiddleware));

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const models = require("./models");

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleAuth.ClientID,
      clientSecret: config.googleAuth.ClientSecret,
      callbackURL: "http://localhost:3000/auth/googleCallback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = await models.User.findOrCreateGoogle(profile);
      return cb(null, user);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user.login);
});

passport.deserializeUser(function (login, cb) {
  cb(null, login);
});

app.use(passport.initialize());
app.use(passport.session());

const router = require("./routers");
const cons = require("consolidate");
app.use(router);

io.on("connection", (socket) => {
  if (socket.request.session.login) {
    socket.join(socket.request.session.login);
    console.log("connected to room " + socket.request.session.login);
  }

  socket.on("creating task", (obj) => {
    if (obj.user && obj.user !== socket.request.session.login) {
      io.to(obj.user).emit("new task", obj);
    }
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

http.listen(3000, () => console.log("Listening on port 3000"));
