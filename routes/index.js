
const router = require('express').Router();
const authTokenValidator = require('../middlewares/validation/authTokenValidator').verifyAuthToken;
const userRoutes = require('./userRoute');
const projectRoutes = require('./projectRoute');
const taskRoutes = require('./taskRoute');

    
router.use('/user',userRoutes);
router.use('/project', authTokenValidator(), projectRoutes);
router.use('/task', authTokenValidator(), taskRoutes);
   
module.exports = router;
