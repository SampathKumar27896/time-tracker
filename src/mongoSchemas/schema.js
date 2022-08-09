const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    emailId: String,
    password: String,
    isActive: Boolean,
    createdBy: String,
    updatedBy: String
}, {timestamps: true});
userSchema.index({ emailId: 1, name: 1});
userSchema.pre("save", async function() {
    // console.log("Inside pre save",this);
    
    // throw new Error("User already exists")
})
const User = mongoose.model('Users', userSchema);
const projectSchema = new Schema({
    userId: mongoose.ObjectId,
    name: String,
    description: String,
    isActive: Boolean,
    createdBy: String,
    updatedBy: String
}, { timestamps: true});
projectSchema.index({ userId: 1});
const Project = mongoose.model('Projects', projectSchema);
const taskSchema = new Schema({
    userId: mongoose.ObjectId,
    projectId: mongoose.ObjectId,
    projectName: String,
    name: String,
    description: String,
    isActive: Boolean,
    createdBy: String,
    updatedBy: String
}, { timestamps: true});
taskSchema.index({ userId: 1, projectId: 1});
const Task = mongoose.model('Tasks', taskSchema);
const taskProgressSchema = new Schema({
    userId: mongoose.ObjectId,
    projectId: mongoose.ObjectId,
    taskId: mongoose.ObjectId,
    projectName: String,
    taskName: String,
    name: String,
    description: String,
    startTime: Date,
    endTime: Date,
    totalTime: String,
    createdBy: String,
    updatedBy: String
}, { timestamps: true })
taskProgressSchema.index({ userId: 1, projectId: 1, taskId: 1});
const TaskProgress = mongoose.model('TaskProgress', taskProgressSchema);
module.exports = {
    User,
    Project,
    Task,
    TaskProgress
}
