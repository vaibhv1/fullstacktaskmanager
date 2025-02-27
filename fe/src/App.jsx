import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Task Management</h1>
        <CreateTask />
        <TaskList />
      </div>
    </div>
  );
}

export default App;