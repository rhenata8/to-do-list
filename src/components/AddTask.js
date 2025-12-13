// import React, { useState } from 'react';

// const AddTaskModal = ({ addTask, closeModal }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [priority, setPriority] = useState('Rendah');
//   const [label, setLabel] = useState('');

//   const handleSubmit = () => {
//     const newTask = {
//       id: Date.now(),
//       title,
//       description,
//       dueDate,
//       priority,
//       label,
//       labelColor: '', // Tentukan warna berdasarkan label
//       status: 'To Do',
//     };
//     addTask(newTask);
//     closeModal();
//   };

//   return (
//     <div>
//       {/* Form input */}
//       <input placeholder="Judul" onChange={(e) => setTitle(e.target.value)} />
//       <textarea placeholder="Deskripsi" onChange={(e) => setDescription(e.target.value)} />
//       <input type="date" onChange={(e) => setDueDate(e.target.value)} />
//       <select onChange={(e) => setPriority(e.target.value)}>
//         <option value="Rendah">Rendah</option>
//         <option value="Sedang">Sedang</option>
//         <option value="Tinggi">Tinggi</option>
//       </select>
//       <input placeholder="Label" onChange={(e) => setLabel(e.target.value)} />
//       <button onClick={handleSubmit}>Tambah</button>
//     </div>
//   );
// };

// export default AddTaskModal;
