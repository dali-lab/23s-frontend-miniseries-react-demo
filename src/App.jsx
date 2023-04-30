import { useContext, useState } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import Task from './components/Task';
import { TaskContext } from './Root';

function App() {
  const { tasks, setTasks } = useContext(TaskContext);
  const [ newTaskId, setNewTaskId ] = useState(0);
  
  const addTask = (task) => {
    setTasks((prevTasks) => ({...prevTasks, [String(newTaskId)]: { text: task, completed: false, id:  String(newTaskId)}}));
    setNewTaskId((prevNewTaskId) => prevNewTaskId + 1);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const newTasks = {...prevTasks};
      delete newTasks[id];
      return newTasks;
    });
  };

  const updateTask = (updatedTask, id) => {
    setTasks((prevTasks) => ({...prevTasks, [String(id)]: updatedTask}));
  };

  const toggleTask = (id, value) => {
    setTasks((prevTasks) => ({
          ...prevTasks, 
          [id]: prevTasks[id] ? {...prevTasks[id], completed: value} : undefined,
      
    }));
  };

  return (
    <div className="App">
      <h1>Simple To-Do List</h1>
      <TaskForm onSubmit={addTask} />
    <ul>
      {Object.entries(tasks).map((entry) => {
        const [id, task] = entry; 
        return <Task key={id} index={id} task={task} onUpdate={updateTask} toggleTask={() => { toggleTask(id, !task.completed)}} onDelete={deleteTask} />})
        }
    </ul>
    </div>
  );
}

export default App;