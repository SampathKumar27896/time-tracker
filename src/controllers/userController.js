const {User} = require('../mongoSchemas/schema');
const registerUser = (req, res) => {
        try {
                console.log(req.body);
                const { userName, password, emailId } = req.body;
                const user = new User({name: userName, password: password, emailId: emailId})
                user.save();
                res.send(user);
        }catch(error) {
                console.log(error);
                throw new error;
        }
}
const loginUser = async(req, res) => {
        try {
                const { emailId, password } = req.body;
                const user = await User.findOne({emailId: emailId, password: password }).exec();
                if(user) {
                        req.session.emailId = user.emailId;
                        req.session.userName = user.name;
                        req.session.userId = user._id;
                        res.send({status: true, message: "Successfully logged in"});
                } else {
                        res.status(401).send({status: false, message: "Unauthorized"});
                }
        }catch(error) {
                console.log(error);
                throw new error;
        }
}
const testFunction = (req, res) => {
        try {
                console.log(req.session.userName);
                res.send(req.session.userName);
        } catch(error) {
                console.log(error);
                throw new error;
        }
}
module.exports = {
        registerUser,
        testFunction,
        loginUser
}