const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: String },
    deadline: { type: Date },
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
