const MIN_PASSWORD_LENGTH =  5;
const MIN_USERNAME_LENGTH = 3;
const MIN_PROJECTNAME_LENGTH = 1;
const MIN_PROJDESC_LENGTH = 3;
module.exports = {

    JWT_EXPIRE_TIME: "1h",
    PASSWORD_SALT_ROUND: 10,
    
    INVALID_EMAIL_MSG: "The given emailId is invalid.",
    PASSWORD_LENGTH_MSG: `The password should have atleast ${MIN_PASSWORD_LENGTH} characters.`,
    USERNAME_LENGTH_MSG: `The userName must be atleast ${MIN_USERNAME_LENGTH} characters.`,
    CONFIRM_PASSWORD_MSG: "Password confirmation does not match password.",
    USER_REG_SUCC_MSG: "User registered successfully.",
    USER_LOGIN_SUCC_MSG: "User logged in successfully.",
    USER_UNAUTH_MSG: "User UnAunthenticated.",
    INVALID_CRED_MSG: "Username / Password invalid. Please try again.",
    USER_EXISTS_MSG: "The given userName already exists.",
    EMAIL_EXISTS_MSG: "The given emailId already exists.",
    INVALID_CREDENTIALS: "Invalid Username or Password.",
    
    PROJECTNAME_LENGTH_MSG: `Project name must be atleast ${MIN_PROJECTNAME_LENGTH} characters in length.`,
    PROJDESC_LENGTH_MSG: `Project description must be atleast ${MIN_PROJDESC_LENGTH} characters in length.`,
    PROJECT_ADDED_SUCC_MSG: "Project added successfully",
    PROJECT_EXISTS_MSG: "The given Project name already exists.",

    TASK_EXISTS_MSG: "The given Task name already exists.",

    MIN_PASSWORD_LENGTH,
    MIN_USERNAME_LENGTH,
    MIN_PROJECTNAME_LENGTH,
    MIN_PROJDESC_LENGTH
}