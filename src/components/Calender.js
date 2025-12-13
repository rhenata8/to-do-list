import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskCalendar = ({ tasks }) => {
  const [date, setDate] = useState(new Date());

  const tasksOnDate = tasks.filter(
    (task) => new Date(task.dueDate).toDateString() === date.toDateString()
  );

  return (
    <div>
      <Calendar onChange={setDate} value={date} />
      <div>
        <h3>Tugas untuk {date.toDateString()}</h3>
        {tasksOnDate.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>
    </div>
  );
};

export default TaskCalendar;
