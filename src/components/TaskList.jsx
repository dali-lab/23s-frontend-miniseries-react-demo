import { useEffect, useState } from 'react';

function TaskList({ tasks, onDelete, onUpdate }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const [draggedTask, setDraggedTask] = useState(null);

  // Editing logic
  const handleEditSubmit = (index) => {
    onUpdate(editValue, index);
    setEditIndex(null);
  };

  useEffect(() => {
    if (editIndex !== null) {
      setEditValue(tasks[editIndex]);
    }
  }, [editIndex, tasks]);



  // Drag and drop callbacks
  const handleDragStart = (e, index) => {
    setDraggedTask(index);
  };

  // dragged element is moved over a valid drop target
  const handleDragOver = (e) => {
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
  };

  // dragged element is dropped onto a valid target
  const handleDrop = (e, index) => {
    if (draggedTask !== index) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 0, updatedTasks.splice(draggedTask, 1)[0]);
      onUpdate(updatedTasks);
    }

    setDraggedTask(null);
    e.currentTarget.classList.remove('drag-over');
  };
  
  // Styling logic

  // dragged element enters the boundaries of a valid drop target
  const handleDragEnter = (e, index) => {
    if (draggedTask !== index) {
      e.currentTarget.classList.add('drag-over');
    }
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  
  return (
    <ul>
      {tasks.map((task, index) => (
        <li 
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragLeave={(e) => handleDragLeave(e, index)}
        >
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
