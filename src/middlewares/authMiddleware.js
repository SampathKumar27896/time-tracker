const authMiddleware = (req, res, next) => {
        try {
                const {userId, emailId, userName} = req.session;
                if(!userId && !emailId && !userName) {
                        res.status(401).send({status: false, message: "Unauthorized"});
                } else {
                        req.body.userId = userId;
                        req.body.emailId = emailId;
                        req.body.userName = userName;
                        next();
                }
        } catch(error) {
                console.error(error);
                throw error;
        }
}

module.exports = {
        authMiddleware
}