import React, { useState } from 'react';
import TaskCard from './TaskCard';

const Dashboard = ({ tasks, labels, onUpdateTask, onDeleteTask }) => {
  const [draggedTask, setDraggedTask] = useState(null);

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  // Drag handlers
  const handleDragStart = (e, task) => { setDraggedTask(task); };
  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedTask) {
      onUpdateTask(draggedTask.id, { status });
      setDraggedTask(null);
    }
  };

  const Column = ({ title, status, taskList, accentColor }) => (
    <div 
      className="kanban-column"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, status)}
    >
      <div className="column-header">
        <h3 className="column-title">
          <span className="status-indicator" style={{ backgroundColor: accentColor }}></span>
          {title}
        </h3>
        <span className="task-count-badge">{taskList.length}</span>
      </div>

      <div className="column-content">
        {taskList.map(task => (
          <div 
            key={task.id} 
            draggable 
            onDragStart={(e) => handleDragStart(e, task)}
            className="draggable-task"
          >
            <TaskCard 
              task={task} 
              labels={labels} 
              onDelete={() => onDeleteTask(task.id)}
              onUpdate={(u) => onUpdateTask(task.id, u)}
            />
          </div>
        ))}
        {taskList.length === 0 && (
          <div className="empty-state">Tidak ada tugas</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="kanban-board">
      <Column title="To Do" status="todo" taskList={todoTasks} accentColor="#EF4444" />
      <Column title="In Progress" status="inprogress" taskList={inProgressTasks} accentColor="#F59E0B" />
      <Column title="Done" status="done" taskList={doneTasks} accentColor="#10B981" />
    </div>
  );
};

export default Dashboard;