const {User} = require('../mongoSchemas/schema');
const registerUser = (req, res) => {
        try {
                let status = true, message = 'Registeration successful';
                const { userName, password, confirmPassword,  emailId } = req.body;
                if(password !== confirmPassword) {
                        status = false;
                        message = `Re-Entered password don't match with password!.`;
                }
                if(userName && password && confirmPassword &&  emailId) {
                        const user = new User({name: userName, password: password, emailId: emailId})
                        user.save();
                } else {
                        status = false;
                        message = `Validation failed!.`;
                }
                res.send({status, message});
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
                        req.session.cookie.userName = user.name;
                        req.session.cookie.emailId = user.emailId;
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