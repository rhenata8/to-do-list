// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';

// Komponen untuk menampilkan setiap tugas
const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>{task.dueDate}</small>
      <div className="priority">{task.priority}</div>
    </div>
  );
};

const App = () => {
  // State untuk menyimpan daftar tugas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Mengerjakan tugas React',
      description: 'Membuat aplikasi to-do list menggunakan React',
      dueDate: '2025-12-20',
      priority: 'Tinggi',
    },
    {
      id: 2,
      title: 'Belajar Git',
      description: 'Mempelajari dasar-dasar penggunaan Git untuk version control',
      dueDate: '2025-12-22',
      priority: 'Sedang',
    },
  ]);

  // Fungsi untuk menambah tugas baru
  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: 'Tugas Baru',
      description: 'Deskripsi tugas baru',
      dueDate: '2025-12-25',
      priority: 'Rendah',
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <button onClick={addTask}>Tambah Tugas</button>
      
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default App;
