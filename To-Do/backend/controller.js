
const task = require('./model');

exports.getApproach = {
    getAllTasks: async (req, res) => {
        try{
            const tasks = await task.find();
            res.status(200).json({
                code: "Success",
                result: tasks.length,
                message: {
                    tasks
                }
            })
        }catch(err){
            console.log(err);
            res.status(400).json({
                code: "Fail",
                message: "Error : " + err.message
            })
        }
    },
    getTask:  async (req, res) => {
        try{
            const id = req.params.id;
            const showTask = await task.findById(id);
            res.status(200).json({
                code: "Success",
                message: {
                    showTask
                }
            })
        }catch(err){
            console.log(err);
            res.status(400).json({
                code: "Fail",
                message: "Error : " + err.message
            })
        }
    }
}

exports.postApproach = {
    addTask: async (req, res) => {
        try{
            const createTask = await task.create(req.body);
            if(!req.body){
                throw new Error("Wrong: Validation Error!! Enter the data regarding the task")
            }
            else{
                res.status(201).json({
                    code: "Success",
                    message: {
                        newTask: createTask
                    }
                })
            }
        }catch(err){
            console.log(err);
            res.status(400).json({
                code: "Fail",
                message: "Error : " + err.message
            })
        }
    }
}


exports.patchApproach = {
    updateTask: async (req, res) => {
        try{
            const id = req.params.id;
            const body = req.body;
    
            const change = await task.findByIdAndUpdate(id, body, {new: true, runValidators: true});
            res.status(201).json({
                code: "Success",
                message: {
                    updatedTask: change
                }
            })
        }catch(err){
            console.log(err);
            res.status(400).json({
                code: "Fail",
                message: "Error : " + err.message
            })
        }
    }
}

exports.deleteApproach = {
    deleteTask: async (req, res) => {
        try{
            const id = req.params.id;
            
            await task.findByIdAndDelete(id);
            res.status(201).json({
                code: "Success",
                message: `Deleted Task with id ${id}`
            })
        }catch(err){
            console.log(err);
            res.status(400).json({
                code: "Fail",
                message: "Error : " + err.message
            })
        }
    }
}