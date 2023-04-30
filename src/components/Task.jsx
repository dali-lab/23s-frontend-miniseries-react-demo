import { useState } from "react";

function Task(props) {
  const { index, task, onUpdate, onDelete, toggleTask } = props
  const [editValue, setEditValue] = useState(task.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSubmit = (index) => {
    onUpdate({...task, text: editValue}, index);
    setIsEditing(false);
  };

  return (
    <li 
      key={index}
      // Toggling
      className={task.completed ? 'completed' : ''}
      data-index={index}
    >
      <input type="checkbox" value={task.completed} onClick={() => { toggleTask(index, !task.completed) }}></input>
      {isEditing ? (
        <>
          <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
          <button onClick={() => handleEditSubmit(index)}>Save</button>
        </>
      ) : (
        <>
          <div className="text">{task.text}</div>
          <div className="edit-buttons">
            <button onClick={() => {setIsEditing(index);}}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </div>
        </>
      )}
    </li>
  )
}

export default Task;