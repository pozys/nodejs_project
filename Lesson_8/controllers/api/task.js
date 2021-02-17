const models = require("../../models");
const config = require("../../config");

exports.taskList = (req, res, next) => {
  models.Task.index()
    .then((tasks) => {
      res.json({ status: "ok", tasks });
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      res.status(403).json({ status: "error", error: err.message });
    });
};

exports.show = (req, res, next) => {
  models.Task.findOne(req.params.id)
    .then((task) => {
      res.json({ status: "ok", task });
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      res.status(403).json({ status: "error", error: err.message });
    });
};

exports.store = (req, res, next) => {
  let params = req.body;
  models.Task.store(params)
    .then((result) => {
      res.json({ status: "ok", taskId: result.insertId });
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      res.status(403).json({ status: "error", error: err.message });
    });
};

exports.updateTask = (req, res, next) => {
  let params = req.body;
  params.id = req.params.id;
  models.Task.update(params)
    .then((result) => {
      res.json({ status: "ok" });
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      res.status(403).json({ status: "error", error: err.message });
    });
};

exports.destroy = (req, res, next) => {
  models.Task.destroy(req.params.id)
    .then((task) => {
      res.json({ status: "ok" });
    })
    .catch((err) => {
      console.log("Ошибка:");
      console.log(err.message);

      res.status(403).json({ status: "error", error: err.message });
    });
};
