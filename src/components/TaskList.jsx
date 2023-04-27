import { useEffect, useState } from 'react';

function TaskList({ tasks, onDelete, onUpdate }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEditSubmit = (index) => {
    onUpdate(index, editValue);
    setEditIndex(null);
  };

  useEffect(() => {
    if (editIndex !== null) {
      setEditValue(tasks[editIndex]);
    }
  }, [editIndex, tasks]);

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {editIndex === index ? (
            <>
              <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
              <button onClick={() => handleEditSubmit(index)}>Save</button>
            </>
          ) : (
            <>
              {task}
              <div className="edit-buttons">
                <button onClick={() => setEditIndex(index)}>Edit</button>
                <button onClick={() => onDelete(index)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
