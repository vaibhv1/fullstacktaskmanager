const Task = require('../models/task');
const sequelize = require('../config/database');

exports.createTask = async (req, res) => {
  try {
    const task = await sequelize.transaction(async (transaction) => {
      return await Task.create(req.body, { transaction });
    });
    res.status(201).json(task);
  } catch (err) {
    console.error('❌ Error creating task:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const statusFlow = ['Pending', 'In Progress', 'Completed'];
    const nextStatus = statusFlow[statusFlow.indexOf(task.status) + 1];
    if (!nextStatus) return res.status(400).json({ error: 'Task already completed' });

    task.status = nextStatus;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { priority, dueIn3Days } = req.query;
    const where = {};

    if (priority) where.priority = priority;
    if (dueIn3Days) where.due_date = { [require('sequelize').Op.lte]: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) };

    const tasks = await Task.findAll({ where });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePriority = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.priority = req.body.priority;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};