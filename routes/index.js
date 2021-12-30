
const router = require('express').Router();
const authTokenValidator = require('../middlewares/validation/authTokenValidator').verifyAuthToken;
const userRoutes = require('./userRoute');
const projectRoutes = require('./projectRoute');

    
router.use('/user',userRoutes);
router.use('/project', authTokenValidator(), projectRoutes);
   
module.exports = router;
