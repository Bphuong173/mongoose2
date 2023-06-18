const express = require("express");

const router = express.Router();
const {
  getAllTasks,
  createTasks,
  updateTasks,
  deleteTasks,
  getSingleTasks,
} = require("../controllers/task");

router.route("/").get(getAllTasks).post(createTasks);
router.route("/:id").get(getSingleTasks).put(updateTasks).delete(deleteTasks);

module.exports = router;
