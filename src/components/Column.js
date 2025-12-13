import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, status, moveTask, deleteTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const bgStyle = isOver ? '#e3f2fd' : '#f4f5f7';

  return (
    <div 
      ref={drop} 
      style={{ 
        width: '300px', 
        minHeight: '400px', 
        backgroundColor: bgStyle, 
        padding: '15px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', textAlign: 'center' }}>{title}</h3>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default Column;