import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

export default function CreateTask() {
  const { addTask, error } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'Medium',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(formData);
    setFormData({ title: '', description: '', due_date: '', priority: 'Medium', status: 'Pending' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md max-w-lg mx-auto mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Create Task</h2>
      <div className="space-y-2">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          required
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Create Task</button>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </form>
  );
}