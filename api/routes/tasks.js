const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create new task
router.post('/', async (req, res) => {
    const { title, description, assignedTo, deadline } = req.body;
    try {
        const newTask = new Task({ title, description, assignedTo, deadline });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update task by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, assignedTo, deadline, completed } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, assignedTo, deadline, completed },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete task by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
