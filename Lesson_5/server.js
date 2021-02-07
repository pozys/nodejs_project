const express = require("express");
const path = require("path");

const templating = require("consolidate");
const cookieParser = require("cookie-parser");

const handlebars = require("handlebars");
templating.requires.handlebars = handlebars;

const connection = require("./DBConnection");
const poolConnection = connection.poolConnection().promise();

const Task = require("./task");
Task.connection = poolConnection;

const app = express();
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine("hbs", templating.handlebars);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "hbs");

handlebars.registerHelper(
  "selectedPriority",
  function (option, currentPriority) {
    return option === currentPriority;
  }
);

app.get("/", (req, res) => {
  Task.index()
    .then((tasks) => {
      let params = { tasks };
      res.render("index", params);
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("index", params);
    });
});

app.get("/create", (req, res) => {
  res.redirect("/taskCreation.html");
});

app.post("/store", (req, res) => {
  let params = req.body;
  Task.store(params)
    .then((result) => {
      res.redirect("/show/" + result.insertId);
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("index", params);
    });
});

app.get("/show/:id", (req, res) => {
  Task.findOne(req.params.id)
    .then((task) => {
      res.render("show", task);
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("index", params);
    });
});

app.get("/edit/:id", (req, res) => {
  Task.findOne(req.params.id)
    .then((task) => {
      res.render("edit", task);
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("index", params);
    });
});

app.post("/update", (req, res) => {
  let params = req.body;
  Task.update(params)
    .then((result) => {
      res.redirect("/show/" + params.id);
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("index", params);
    });
});

app.post("/destroy/:id", (req, res) => {
  Task.destroy(req.params.id)
    .then((task) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("index", params);
    });
});

app.listen(3000, () => console.log("Listening on port 3000"));
