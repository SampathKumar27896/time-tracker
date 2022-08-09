const router = require('express').Router();
const otherController = require('../controllers/otherController');
router.post('/project/addProject', otherController.addProject);
module.exports = router;