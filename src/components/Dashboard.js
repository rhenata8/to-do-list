//
import React, { useState } from 'react';
// Hapus import ikon yang tidak digunakan
// import { Trash2, Plus } from 'lucide-react'; 
import TaskCard from './TaskCard';

const Dashboard = ({ tasks, labels, onUpdateTask, onDeleteTask }) => {
  const [draggedTask, setDraggedTask] = useState(null);

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTask) {
      onUpdateTask(draggedTask.id, { status: newStatus });
      setDraggedTask(null);
    }
  };

  const Column = ({ title, status, taskList, color }) => (
    <div className="kanban-column">
      <div className="column-header">
        <h3 className="column-title">
          <span className="column-status" style={{ color }}>{title}</span>
          <span className="task-count">{taskList.length}</span>
        </h3>
      </div>

      <div
        className="column-content"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, status)}
      >
        {taskList.length === 0 ? (
          <div className="empty-state">
            <p>Belum ada tugas</p>
          </div>
        ) : (
          taskList.map(task => (
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
                onUpdate={(updates) => onUpdateTask(task.id, updates)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="kanban-board">
        <Column
          title="To Do"
          status="todo"
          taskList={todoTasks}
          color="#EF4444"
        />
        <Column
          title="In Progress"
          status="inprogress"
          taskList={inProgressTasks}
          color="#F59E0B"
        />
        <Column
          title="Done"
          status="done"
          taskList={doneTasks}
          color="#10B981"
        />
      </div>
    </div>
  );
};

export default Dashboard;