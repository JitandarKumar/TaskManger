const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        
    }],
    createdBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    attachments: [{
        type: String, // Assuming attachments are stored as URLs or file paths
    }],
    todoChecklist: [todoSchema],
    progress: {
        type: Number,
        default: 0, // Progress in percentage
    },
}, 
{
    timestamps: true,
});

module.exports = mongoose.model("task", taskSchema);