const express = require('express');
const router = express.Router();
const { createTask, updateStatus, getTasks, getTaskById,updatePriority,deleteTask } = require('../controllers/taskController');

router.post('/', createTask);
router.patch('/:id/update-status', updateStatus);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.patch('/:id/priority', updatePriority);
router.delete('/:id', deleteTask);
module.exports = router;