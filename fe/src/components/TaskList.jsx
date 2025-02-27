import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

export default function TaskList() {
  const { tasks, loading, error, updateTaskStatus, updateTaskPriority, deleteTask } = useTasks();
  const [showHighPriority, setShowHighPriority] = useState(false);
  const [showDueSoon, setShowDueSoon] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const dueSoon = new Date(task.due_date) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    return (
      (!showHighPriority || task.priority === 'High') &&
      (!showDueSoon || dueSoon)
    );
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 dark:bg-red-900';
      case 'Medium':
        return 'bg-yellow-100 dark:bg-yellow-900';
      case 'Low':
        return 'bg-green-100 dark:bg-green-900';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Overdue':
        return 'bg-red-500 text-white';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <label className="flex items-center">
          <input type="checkbox" checked={showHighPriority} onChange={() => setShowHighPriority((prev) => !prev)} />
          <span className="ml-2">Show High Priority</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" checked={showDueSoon} onChange={() => setShowDueSoon((prev) => !prev)} />
          <span className="ml-2">Show Due Soon</span>
        </label>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="space-y-4">
        {sortedTasks.map((task) => (
          <li key={task.id} className={`p-6 rounded-xl shadow-md flex justify-between items-center ${getPriorityColor(task.priority)} ${getStatusColor(task.status)}`}>
            <div>
              <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">{task.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">Due: {new Date(task.due_date).toLocaleDateString()}</p>
              <p className="text-sm">Priority: {task.priority}</p>
              <p className="text-sm">Status: {task.status}</p>
            </div>
            <div className="flex gap-4 items-center">
              <select
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                disabled={task.status === 'Overdue'}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Overdue</option>
              </select>
              <select
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                value={task.priority}
                onChange={(e) => updateTaskPriority(task.id, e.target.value)}
                disabled={task.status === 'Completed' || task.status === 'Overdue'}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}