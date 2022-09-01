const { Project, Task, TaskProgress } = require("../mongoSchemas/schema");
const { paginator } = require("../helpers/utilityFuncitons");

const addProject = (req, res) => {
  try {
    const { userId, projectName, description, isActive, userName } = req.body;
    const project = new Project({
      userId: userId,
      name: projectName,
      description: description,
      isActive: isActive,
      createdBy: userName,
      updatedBy: userName,
    });
    project.save();
    res
      .status(201)
      .send({ status: true, message: "Project successfully added" });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getProject = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 0;
    let conditions = { isActive: true, userId: req.body.userId };
    if (req.query.projectId) {
      conditions["_id"] = req.query.projectId;
    }
    let selectFields = ["name", "description", "isActive"];
    let pagination = { skip: 0, limit: 5, page: page };
    let paginationResult = await paginator(
      Project,
      conditions,
      selectFields,
      pagination
    );
    res.send({ ...paginationResult });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const updateProject = async (req, res) => {
  try {
    let { projectId, projectName, description, isActive, userName } = req.body;
    const result = await Project.update(
      { _id: projectId },
      {
        name: projectName,
        description: description,
        udpatedBy: userName,
        isActive: isActive,
      }
    );
    console.log(result);
    res.send({ status: true, message: "Project updated successfully" });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const addTask = (req, res) => {
  try {
    const {
      userId,
      userName,
      projectId,
      projectName,
      taskName,
      description,
      isActive,
    } = req.body;
    const project = new Task({
      userId: userId,
      projectId: projectId,
      projectName: projectName,
      name: taskName,
      description: description,
      isActive: isActive,
      createdBy: userName,
      updatedBy: userName,
    });
    project.save();
    res.status(201).send({ status: true, message: "Task successfully added" });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const updateTask = async (req, res) => {
  try {
    let {
      projectId,
      projectName,
      taskId,
      taskName,
      description,
      isActive,
      userName,
    } = req.body;
    const result = await Task.update(
      { _id: taskId },
      {
        porjectId: projectId,
        projectName: projectName,
        name: taskName,
        description: description,
        udpatedBy: userName,
        isActive: isActive,
      }
    );
    console.log(result);
    res.send({ status: true, message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getTask = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 0;
    let conditions = { isActive: true, userId: req.body.userId };
    if (req.query.projectId) {
      conditions["projectId"] = req.query.projectId;
    }
    if (req.query.taskId) {
      conditions["_id"] = req.query.taskId;
    }
    let selectFields = [
      "projectId",
      "projectName",
      "name",
      "description",
      "isActive",
    ];
    let pagination = { skip: 0, limit: 5, page: page };
    let paginationResult = await paginator(
      Task,
      conditions,
      selectFields,
      pagination
    );
    const projects = await Project.find({ userId: req.body.userId }, [
      "name",
    ]).exec();
    const taskProgress = await TaskProgress.find({
      $and: [{ userId: req.body.userId }, { taskProgressState: 2 }],
    }).exec();
    res.send({
      status: true,
      projects: projects,
      taskProgress: taskProgress,
      ...paginationResult,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const upsertTaskProgress = async (req, res) => {
  try {
    const { taskProgressState } = req.body;
    if (taskProgressState === 2) {
      const {
        userId,
        userName,
        projectId,
        projectName,
        taskId,
        taskName,
        startTime,
      } = req.body;
      const taskProgress = new TaskProgress({
        userId: userId,
        projectId: projectId,
        projectName: projectName,
        taskId: taskId,
        taskName: taskName,
        startTime: startTime,
        taskProgressState: taskProgressState,
        createdBy: userName,
      });
      taskProgress.save();
      res.send({ status: true, message: "Task started successfully" });
    } else if (taskProgressState === 3) {
      const { taskProgressId, endTime, hours, minutes, description, userName } =
        req.body;
      const result = await TaskProgress.update(
        { _id: taskProgressId },
        {
          endTime: endTime,
          hours: hours,
          minutes: minutes,
          description: description,
          taskProgressState: taskProgressState,
          updatedBy: userName,
        }
      );
      console.log(result);
      res.send({ status: true, message: "Task progress saved successfully" });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getTaskProgressStats = async (req, res) => {
  try {
    const { userId, projectId, taskId } = req.body;
    let matchStage = {
      $match: {
        userId: userId,
        taskProgressState: 3,
      },
    };
    if (projectId && projectId !== null) {
      matchStage["$match"]["projectId"] = projectId;
    }
    if (taskId && taskId !== null) {
      matchStage["$match"]["taskId"] = taskId;
    }
    const pipeline = [
      matchStage,
      {
        $project: {
          projectName: 1,
          taskName: 1,
          description: 1,
          startTime: 1,
          endTime: 1,
          totalTimeInMinutes: {
            $dateDiff: {
              startDate: "$startTime",
              endDate: "$endTime",
              unit: "minute",
            },
          },
          totalHours: {
            $floor: {
              $divide: [
                {
                  $dateDiff: {
                    startDate: "$startTime",
                    endDate: "$endTime",
                    unit: "minute",
                  },
                },
                60,
              ],
            },
          },
          totalMinutes: {
            $mod: [
              {
                $dateDiff: {
                  startDate: "$startTime",
                  endDate: "$endTime",
                  unit: "minute",
                },
              },
              60,
            ],
          },
        },
      },
      {
        $group: {
          _id: "$projectName",
          totalMinutes: {
            $sum: "$totalTimeInMinutes",
          },
          projectName: {
            $last: "$projectName",
          },
          taskName: {
            $last: "$taskName",
          },
        },
      },
      {
        $sort: {
          projectName: 1,
        },
      },
    ];
    const result = await TaskProgress.aggregate(pipeline);
    res.send({ status: true, data: result });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  addProject,
  getProject,
  updateProject,
  addTask,
  updateTask,
  getTask,
  upsertTaskProgress,
  getTaskProgressStats,
};
