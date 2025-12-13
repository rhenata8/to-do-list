import React from 'react';

const ProgressChart = ({ total, completed, inProgress, todo }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-chart">
      <svg width="120" height="120" className="progress-ring">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="#EF4444"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="progress-fill"
        />
      </svg>
      <div className="progress-text">
        <span className="percentage">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressChart;