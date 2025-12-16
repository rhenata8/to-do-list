import React from 'react';
import { Trash2, Calendar } from 'lucide-react';

const TaskCard = ({ task, labels, onDelete }) => {
  const priorityClass = `priority-${task.priority}`;

  return (
    <div className={`task-card ${priorityClass}`}>
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            onDelete(); 
          }}
          className="btn-icon-delete"
          title="Hapus tugas"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {task.labels.length > 0 && (
        <div className="task-labels">
          {task.labels.map((lbl, idx) => {
            const labelObj = labels.find(l => l.name === lbl);
            const color = labelObj ? labelObj.color : '#94A3B8';
            return (
              <span 
                key={idx} 
                className="label-badge"
                style={{
                  backgroundColor: `${color}20`,
                  color: color,
                  borderLeft: `3px solid ${color}`
                }}
              >
                {lbl}
              </span>
            );
          })}
        </div>
      )}

      <div className="task-footer">
        <div className="task-date">
          <Calendar size={14} />
          <span>{new Date(task.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className={`priority-badge priority-${task.priority}`}>
          {task.priority === 'high' ? 'Tinggi' : task.priority === 'medium' ? 'Sedang' : 'Rendah'}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;