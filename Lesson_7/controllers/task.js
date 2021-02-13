const cons = require("consolidate");
const models = require("../models");

const taskList = async (req, res, next) => {
  if (!req.session.login) {
    res.redirect("/auth/login");
  }
  models.Task.index()
    .then((tasks) => {
      let params = { tasks };
      res.render("main", params);
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("main", params);
    });
};

const creationPage = async (req, res, next) => {
  res.redirect("/taskCreation.html");
};

const store = async (req, res, next) => {
  let params = req.body;
  models.Task.store(params)
    .then((result) => {
      res.redirect("/tasks/show/" + result.insertId);
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("main", params);
    });
};

const getShowPage = async (req, res, next) => {
  models.Task.findOne(req.params.id)
    .then((task) => {
      res.render("show", task);
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("main", params);
    });
};

const getEditPage = async (req, res, next) => {
  models.Task.findOne(req.params.id)
    .then((task) => {
      res.render("edit", task);
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("main", params);
    });
};

const updateTask = async (req, res, next) => {
  let params = req.body;
  models.Task.update(params)
    .then((result) => {
      res.redirect("/tasks/show/" + params.id);
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("main", params);
    });
};

const destroy = async (req, res, next) => {
  models.Task.destroy(req.params.id)
    .then((task) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      let params = { error: err.message };
      res.render("main", params);
    });
};

module.exports = {
  taskList,
  creationPage,
  store,
  getShowPage,
  getEditPage,
  updateTask,
  destroy,
};
