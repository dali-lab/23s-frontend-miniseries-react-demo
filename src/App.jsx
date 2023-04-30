import { useContext, useState, useEffect } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import Task from './components/Task';
import { TaskContext } from './Root';

import * as db from './services/datastore';

function App() {
  const {tasks, setTasks } = useContext(TaskContext);
  // uncomment for realtime!
  // const [ newTaskId, setNewTaskId ] = useState(0);

  useEffect(() => {
    db.fetchTasks((newTasks) => {
      console.log(newTasks);
      setTasks(newTasks);
    });
  }, [setTasks]);
  
  // note: "task" here is just the text
  const addTask = (task) => {
    // uncomment for realtime!
    // setTasks((prevTasks) => ({...prevTasks, [String(newTaskId)]: { text: task, completed: false, id:  String(newTaskId)}}));
    // setNewTaskId((prevNewTaskId) => prevNewTaskId + 1);

    const newTask = { text: task, completed: false}; // firebase will handle the id creation
    db.createTask(newTask);
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => {
      const newTasks = {...prevTasks};
      delete newTasks[index];
      return newTasks;
    });
  };

  const updateTask = (updatedTask, id) => {
    // from realtime!
    // setTasks((prevTasks) => ({...prevTasks, [String(index)]: updatedTask}));
    db.updateTask(id, updatedTask);
  };

  const toggleTask = (id) => {
    // if (tasks) {
    //   setTasks((prevTasks) => {
    //     if (prevTasks[id]) {
    //       return {
    //         ...prevTasks, 
    //         [id]: prevTasks[id] ? {...prevTasks[id], completed: !prevTasks[id].completed} : undefined,
    //     } 
    //   } else {
    //     return prevTasks;
    //   }});
    // }

    db.updateTask(id, {completed: !tasks[id].completed});
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