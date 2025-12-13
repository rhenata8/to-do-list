import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

const AddTaskModal = ({ labels, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    labels: [],
    status: 'todo'
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLabelToggle = (labelName) => {
    setFormData(prev => ({
      ...prev,
      labels: prev.labels.includes(labelName)
        ? prev.labels.filter(l => l !== labelName)
        : [...prev.labels, labelName]
    }));
  };

  const handlePriorityChange = (priority) => {
    setFormData(prev => ({
      ...prev,
      priority
    }));
  };

  const handleDateChange = (e) => {
    setFormData(prev => ({
      ...prev,
      dueDate: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Tambah Tugas Baru</h2>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Judul */}
          <div className="form-group">
            <label>Judul *</label>
            <input
              type="text"
              name="title"
              placeholder="Masukkan judul tugas"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Deskripsi */}
          <div className="form-group">
            <label>Deskripsi</label>
            <textarea
              name="description"
              placeholder="Masukkan deskripsi tugas"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          {/* Due Date */}
          <div className="form-group">
            <label>Due Date *</label>
            <div className="date-input-wrapper">
              <Calendar size={20} />
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleDateChange}
                required
              />
            </div>
          </div>

          {/* Prioritas */}
          <div className="form-group">
            <label>Prioritas *</label>
            <div className="priority-buttons">
              {[
                { value: 'low', label: 'Rendah' },
                { value: 'medium', label: 'Sedang' },
                { value: 'high', label: 'Tinggi' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`priority-btn ${formData.priority === option.value ? 'active' : ''}`}
                  onClick={() => handlePriorityChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Label */}
          <div className="form-group">
            <label>Label *</label>
            <div className="label-buttons">
              {labels.map(label => (
                <button
                  key={label.id}
                  type="button"
                  className={`label-btn ${formData.labels.includes(label.name) ? 'active' : ''}`}
                  style={{
                    backgroundColor: formData.labels.includes(label.name) ? label.color : '#F3F4F6',
                    color: formData.labels.includes(label.name) ? 'white' : '#1F2937'
                  }}
                  onClick={() => handleLabelToggle(label.name)}
                >
                  {label.name}
                </button>
              ))}
            </div>
          </div>

          {/* Status Awal */}
          <div className="form-group">
            <label>Status Awal</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary">
              Tambah Tugas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;