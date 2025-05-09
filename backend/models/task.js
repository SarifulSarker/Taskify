const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // 'require' should be 'required'
        unique: true,
    },
    desc: {
        type: String,  // You should specify the type for 'desc'
        required: true,  // 'require' should be 'required'
        unique: true,
    },
    important: {
        type: Boolean,
        default: false,
    },
    complete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,  // Correct spelling of 'timestamps'
});

module.exports = mongoose.model("task", taskSchema);
