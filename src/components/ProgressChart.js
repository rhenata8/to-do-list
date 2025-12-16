import React from 'react';

const ProgressChart = ({ total, todoPercentage, inProgressPercentage, donePercentage }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  
  // Menghitung offset untuk setiap segmen
  const todoOffset = 0;
  const inProgressOffset = (todoPercentage / 100) * circumference;
  const doneOffset = ((todoPercentage + inProgressPercentage) / 100) * circumference;

  return (
    <div className="progress-chart">
      <svg width="120" height="120" className="progress-ring">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
        />
        
        {/* To Do segment (merah) */}
        {todoPercentage > 0 && (
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#EF4444"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (todoPercentage / 100) * circumference}
            strokeLinecap="round"
            className="progress-segment"
            transform="rotate(-90 60 60)"
          />
        )}
        
        {/* In Progress segment (kuning) */}
        {inProgressPercentage > 0 && (
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (inProgressPercentage / 100) * circumference}
            strokeLinecap="round"
            className="progress-segment"
            transform={`rotate(${(todoPercentage / 100) * 360 - 90} 60 60)`}
          />
        )}
        
        {/* Done segment (hijau) */}
        {donePercentage > 0 && (
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#10B981"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (donePercentage / 100) * circumference}
            strokeLinecap="round"
            className="progress-segment"
            transform={`rotate(${((todoPercentage + inProgressPercentage) / 100) * 360 - 90} 60 60)`}
          />
        )}
      </svg>
      <div className="progress-text">
        <span className="total-tasks">{total}</span>
        <span className="tasks-label">Tugas</span>
      </div>
    </div>
  );
};

export default ProgressChart;