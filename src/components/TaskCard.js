import React from 'react';
import { Trash2, Calendar } from 'lucide-react';

const TaskCard = ({ task, labels, onDelete, onUpdate }) => {
  const getTaskLabels = () => {
    return task.labels.map(labelName => {
      const label = labels.find(l => l.name === labelName);
      return label;
    }).filter(Boolean);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#6B7280',
      medium: '#F59E0B',
      high: '#EF4444'
    };
    return colors[priority] || '#6B7280';
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      low: 'Rendah',
      medium: 'Sedang',
      high: 'Tinggi'
    };
    return labels[priority] || priority;
  };

  const taskLabels = getTaskLabels();

  return (
    <div className="task-card">
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <button
          className="btn-delete"
          onClick={onDelete}
          title="Hapus tugas"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        {taskLabels.length > 0 && (
          <div className="task-labels">
            {taskLabels.map(label => (
              <span
                key={label.id}
                className="label-badge"
                style={{ backgroundColor: label.color }}
              >
                {label.name}
              </span>
            ))}
          </div>
        )}

        <div className="task-priority">
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {getPriorityLabel(task.priority)}
          </span>
        </div>
      </div>

      {task.dueDate && (
        <div className="task-footer">
          <Calendar size={14} />
          <span>{formatDate(task.dueDate)}</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;