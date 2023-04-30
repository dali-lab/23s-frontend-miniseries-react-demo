import { useContext, useEffect } from 'react';
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
      setTasks(newTasks ? newTasks : {});
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

  const deleteTask = (id) => {
    // setTasks((prevTasks) => {
    //   const newTasks = {...prevTasks};
    //   delete newTasks[index];
    //   return newTasks;
    // });
    db.deleteTask(id);
  };

  const updateTask = (updatedTask, id) => {
    // from realtime!
    // setTasks((prevTasks) => ({...prevTasks, [String(id)]: updatedTask}));

    db.updateTask(id, updatedTask);
  };

  const toggleTask = (id, completed) => {
    // setTasks((prevTasks) => ({
    //       ...prevTasks, 
    //       [id]: prevTasks[id] ? {...prevTasks[id], completed} : undefined,
    // }));
    db.updateTask(id, {completed});
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