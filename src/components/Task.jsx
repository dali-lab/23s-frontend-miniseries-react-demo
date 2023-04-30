import { useState } from "react";

function Task(props) {
  const { index, task, onUpdate, onDelete, toggleTask } = props
  const [editValue, setEditValue] = useState(task.text);
  const [isEditing, setIsEditing] = useState(false);
  const [prevCompletionState, setPrevCompletionState] = useState(task.completed);

  const handleEditSubmit = (index) => {
    onUpdate({...task, completed: prevCompletionState, text: editValue}, index);
    setIsEditing(false);
  };

  return (
    <li 
      key={index}
      // Toggling
      className={task.completed ? 'completed' : ''}
      data-index={index}
    >
      <input type="checkbox" value={task.completed} onClick={() => { if (!isEditing) toggleTask(index) }}></input>
      {isEditing ? (
        <>
          <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
          <button onClick={() => handleEditSubmit(index)}>Save</button>
        </>
      ) : (
        <>
          <div className="text">{task.text}</div>
          <div className="edit-buttons">
            <button onClick={() => { setPrevCompletionState(task.completed); setIsEditing(index);}}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </div>
        </>
      )}
    </li>
  )
}

export default Task;