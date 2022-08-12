const router = require('express').Router();
const otherController = require('../controllers/otherController');
router.post('/project/addProject', otherController.addProject);
router.get('/project/getProjects', otherController.getProject);
router.post('/project/updateProject', otherController.updateProject);
module.exports = router;