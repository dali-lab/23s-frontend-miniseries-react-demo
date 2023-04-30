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

  const deleteTask = (index) => {
    setTasks((prevTasks) => {
      const newTasks = {...prevTasks};
      delete newTasks[index];
      return newTasks;
    });
  };

  const updateTask = (updatedTask, index) => {
    setTasks((prevTasks) => ({...prevTasks, [String(index)]: updatedTask}));
  };

  const toggleTask = (index) => {
    if (tasks) {
      setTasks((prevTasks) => {
        if (prevTasks[index]) {
          return {
            ...prevTasks, 
            [String(index)]: prevTasks[String(index)] ? {...prevTasks[index], completed: !prevTasks[index].completed} : undefined,
        } 
      } else {
        return prevTasks;
      }});
    }
  };

  return (
    <div className="App">
      <h1>Simple To-Do List</h1>
      <TaskForm onSubmit={addTask} />
    <ul>
      {Object.entries(tasks).map((entry) => {
        const [index, task] = entry; 
        return <Task key={index} index={index} task={task} onUpdate={updateTask} toggleTask={toggleTask} onDelete={deleteTask} />})
        }
    </ul>
    </div>
  );
}

export default App;