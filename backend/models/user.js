const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type :String,
        required: true,
        unique:true,

    },
    email:{
        type : String,
        required: true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId, // Store ObjectIds of tasks
        ref: 'task',  // Reference to the Task model
    }]



});
module.exports = mongoose.model("user", userSchema);