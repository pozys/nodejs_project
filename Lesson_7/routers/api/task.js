const express = require("express");
const controllers = require("../../controllers");

const router = express.Router();

const apiTask = controllers.api.task;

router.use(controllers.api.auth.checkJWT);
router.get("/", apiTask.taskList);
router.get("/:id", apiTask.show);
router.post("/", apiTask.store);
router.put("/:id", apiTask.updateTask);
router.delete("/:id", apiTask.destroy);

module.exports = router;
