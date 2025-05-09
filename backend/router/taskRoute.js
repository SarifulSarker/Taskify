const router = require("express").Router();

const Task = require("../models/task");
const User = require("../models/user");
router.post("/create-task", async (req, res) =>{
    try {
        
        const {title, desc} = req.body;
        const {id} = req.headers;
        const newTask = new Task ({title:  title, desc : desc});
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, {$push:{tasks : taskId._id}});

        res.status(200).json({message: "Task Created"});



    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Interner server Error"});
    }
});


// fetch task

router.get("/get-all-tasks", async(req, res) =>{
    try {
        const{id} = req.headers;
        const userData = await User.findById(id).populate({
            path:"tasks",
            options:{sort:{createdAt: -1}},
        });
        res.status(200).json({data: userData});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Interner server Error"});
    }
});

// delete tsak

router.delete("/delete-tasks/:id", async(req, res) =>{
    try {
       const {id} = req.params;
       await Task.findByIdAndDelete(id);// delete from task

        const userId = req.headers.id;
        await User.findByIdAndUpdate(userId, {$pull: {tasks:id}});

        res.status(200).json({message: "Task Deleted Successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Interner server Error"});
    }
});

//Update Tasks

router.put("/update-tasks/:id", async(req, res) =>{
    try {
       const {id} = req.params;
       const{title, desc} = req.body;
       await Task.findByIdAndUpdate(id, {title: title, desc: desc});

        res.status(200).json({message: "Task Update Successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Interner server Error"});
    }
});

// update important tasks

router.get("/updateImportant-tasks/:id", async(req, res) =>{
    try {
       const {id} = req.params;
      const TaskData = await Task.findById(id);
      const impData = TaskData.important;
       await Task.findByIdAndUpdate(id, {important: !impData});

        res.status(200).json({message: "Task Update Successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Interner server Error"});
    }
});
// update complete tasks

router.put("/updateComplete-tasks/:id", async(req, res) =>{
    try {
       const {id} = req.params;
      const TaskData = await Task.findById(id);
      const completeData = TaskData.complete;
       await Task.findByIdAndUpdate(id, {complete: !completeData});

        res.status(200).json({message: "Task Update Successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Interner server Error"});
    }
});

// get important taks

router.get("/get-important-tasks", async(req, res) =>{
    try {
        const{id} = req.headers;
        const ImpTaskData = await User.findById(id).populate({
            path:"tasks",
            match: {important:true},
            options:{sort:{createdAt: -1}},
        });
       const Imp = ImpTaskData.tasks;

        res.status(200).json({data: Imp});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Interner server Error"});
    }
});
// get complete taks
router.get("/get-important-tasks", async(req, res) =>{
    try {
        const{id} = req.headers;
        const ImpTaskData = await User.findById(id).populate({
            path:"tasks",
            match: {complete:true},
            options:{sort:{createdAt: -1}},
        });
       const comp = ImpTaskData.tasks;

        res.status(200).json({data: comp});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Interner server Error"});
    }
});

// get incomplete taks
router.get("/get-incomplete-tasks", async(req, res) =>{
    try {
        const{id} = req.headers;
        const ImpTaskData = await User.findById(id).populate({
            path:"tasks",
            match: {complete:false},
            options:{sort:{createdAt: -1}},
        });
       const comp = ImpTaskData.tasks;

        res.status(200).json({data: comp});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Interner server Error"});
    }
});

router.put("/updateImportant-task/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      const updatedTask = await Task.findByIdAndUpdate(id, { important: !task.important });
      res.status(200).json({ message: "Importance toggled successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error updating importance" });
    }
  });
  

module.exports = router;