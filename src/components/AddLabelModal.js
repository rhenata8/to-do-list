import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddLabelModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    color: '#3B82F6'
  });

  const predefinedColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#A855F7',
    '#EC4899', '#06B6D4', '#F97316', '#6366F1', '#14B8A6'
  ];

  const handleNameChange = (e) => {
    setFormData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
  };

  const handleCustomColor = (e) => {
    setFormData(prev => ({
      ...prev,
      color: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Tambah Label Baru</h2>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Nama Label */}
          <div className="form-group">
            <label>Nama Label *</label>
            <input
              type="text"
              placeholder="Contoh: Kuliah, Freelance, dll"
              value={formData.name}
              onChange={handleNameChange}
              required
            />
          </div>

          {/* Warna Label */}
          <div className="form-group">
            <label>Warna Label *</label>
            <div className="color-grid">
              {predefinedColors.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${formData.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                />
              ))}
            </div>
            <div className="custom-color">
              <label>Custom:</label>
              <input
                type="color"
                value={formData.color}
                onChange={handleCustomColor}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="form-group">
            <label>Preview:</label>
            <div className="label-preview">
              <span
                className="preview-label"
                style={{ backgroundColor: formData.color }}
              >
                {formData.name || 'Nama Label'}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary">
              Tambah Label
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLabelModal;