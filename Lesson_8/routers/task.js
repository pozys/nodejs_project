const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.get('/main/', controllers.task.taskList);
router.get('/create/', controllers.task.creationPage);
router.post('/store/', controllers.task.store);
router.get('/show/:id/', controllers.task.getShowPage);
router.get('/edit/:id', controllers.task.getEditPage);
router.post('/update', controllers.task.updateTask);
router.post('/destroy/:id/', controllers.task.destroy);

module.exports = router;