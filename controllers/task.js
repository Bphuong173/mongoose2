const getAllTasks = (req, res) => {
  res.send("All tasks");
};

const createTasks = (req, res) => {
  res.json(req.body);
};
const getSingleTasks = (req, res) => {
  res.json({ id: req.params.id });
};
const updateTasks = (req, res) => {
  res.send("update tasks");
};
const deleteTasks = (req, res) => {
  res.send("delete tasks");
};

module.exports = {
  getAllTasks,
  createTasks,
  getSingleTasks,
  updateTasks,
  deleteTasks,
};
