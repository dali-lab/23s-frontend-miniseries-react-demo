import { useState } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = { text: task, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const updateTask = (newTask, index) => {
    /* setTasks((prevTasks) => {
      return prevTasks.map((task, i) => (i === index ? newTask : task));
    }); */

    setTasks((prevTasks) => {
      return prevTasks.map((task, i) => (i === index ? { text: newTask, completed: false } : task));
    });
  };

  const toggleTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Simple To-Do List</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} setTasks={setTasks} toggleTask={toggleTask} />
    </div>
  );
}

export default App;