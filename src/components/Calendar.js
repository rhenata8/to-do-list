import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = ({ tasks, labels }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11)); // Desember 2025

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(task => task.dueDate === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthName = currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const upcomingTasks = tasks
    .filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= new Date();
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="calendar-container">
      <div className="calendar-main">
        <div className="calendar-header">
          <button onClick={handlePrevMonth} className="nav-btn">
            <ChevronLeft size={24} />
          </button>
          <h2>{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h2>
          <button onClick={handleNextMonth} className="nav-btn">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="calendar-grid">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day ? 'active' : 'empty'}`}
            >
              {day && (
                <>
                  <div className="day-number">{day}</div>
                  <div className="day-tasks">
                    {getTasksForDate(day).map(task => (
                      <div
                        key={task.id}
                        className="day-task-dot"
                        title={task.title}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="upcoming-tasks">
        <h3>Tugas Mendatang</h3>
        {upcomingTasks.length === 0 ? (
          <p className="no-tasks">Tidak ada tugas mendatang</p>
        ) : (
          <div className="tasks-list">
            {upcomingTasks.map(task => (
              <div key={task.id} className="upcoming-task-item">
                <div className="task-info">
                  <h4>{task.title}</h4>
                  <p className="task-date">
                    {new Date(task.dueDate).toLocaleDateString('id-ID')}
                  </p>
                </div>
                {task.labels.length > 0 && (
                  <div className="task-labels-small">
                    {task.labels.map(labelName => {
                      const label = labels.find(l => l.name === labelName);
                      return label ? (
                        <span
                          key={label.id}
                          className="label-dot"
                          style={{ backgroundColor: label.color }}
                          title={label.name}
                        />
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;