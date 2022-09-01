const router = require("express").Router();
const otherController = require("../controllers/otherController");
router.post("/project/addProject", otherController.addProject);
router.get("/project/getProjects", otherController.getProject);
router.post("/project/updateProject", otherController.updateProject);
router.post("/task/addTask", otherController.addTask);
router.get("/task/getTasks", otherController.getTask);
router.post("/task/updateTask", otherController.updateTask);
router.post("/task/upsertTaskProgress", otherController.upsertTaskProgress);
router.get(
  "/taskProgress/getTaskProgressStats",
  otherController.getTaskProgressStats
);
module.exports = router;
