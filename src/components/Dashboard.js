import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'TASK';

const TaskCard = ({ task, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.priority}</div>
      <div>{task.dueDate}</div>
    </div>
  );
};

const Column = ({ tasks, title, moveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => moveTask(item.id, title),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightblue' : 'white' }}>
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} moveTask={moveTask} />
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description', priority: 'High', dueDate: '2025-12-20', status: 'todo' },
    // Tambahkan tugas lainnya
  ]);

  const moveTask = (taskId, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: status } : task
      )
    );
  };

  const todos = tasks.filter((task) => task.status === 'todo');
  const inProgress = tasks.filter((task) => task.status === 'in-progress');
  const done = tasks.filter((task) => task.status === 'done');

  return (
    <div>
      <Column title="To Do" tasks={todos} moveTask={moveTask} />
      <Column title="In Progress" tasks={inProgress} moveTask={moveTask} />
      <Column title="Done" tasks={done} moveTask={moveTask} />
    </div>
  );
};

export default Dashboard;
