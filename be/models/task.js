const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: DataTypes.TEXT,
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isAfter: new Date().toISOString(),
    },
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'Completed', 'Overdue'),
    defaultValue: 'Pending',
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
});

module.exports = Task;