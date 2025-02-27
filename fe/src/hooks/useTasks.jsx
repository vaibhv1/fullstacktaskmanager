import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'https://fullstacktaskmanager.onrender.com/tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks((prev) => [...prev, response.data]);
      setReload((prev) => !prev); // Trigger reload
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.patch(`${API_URL}/${taskId}/update-status`, { status });
      setTasks((prev) => prev.map((task) => (task.id === taskId ? response.data : task)));
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const updateTaskPriority = async (taskId, priority) => {
    try {
      const response = await axios.patch(`${API_URL}/${taskId}/update-priority`, { priority });
      setTasks((prev) => prev.map((task) => (task.id === taskId ? response.data : task)));
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, reload]); 

  return { tasks, loading, error, addTask, updateTaskStatus, updateTaskPriority, deleteTask };
};
