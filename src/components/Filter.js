import React from 'react';

const FilterPanel = ({ labels, filters, onFilterChange }) => {
  const handleLabelToggle = (labelName) => {
    const newLabels = filters.labels.includes(labelName)
      ? filters.labels.filter(l => l !== labelName)
      : [...filters.labels, labelName];
    onFilterChange({ ...filters, labels: newLabels });
  };

  const handlePriorityToggle = (priority) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    onFilterChange({ ...filters, priority: newPriorities });
  };

  const handleDateChange = (e) => {
    onFilterChange({ ...filters, dueDate: e.target.value || null });
  };

  const handleClearFilters = () => {
    onFilterChange({ labels: [], priority: [], dueDate: null });
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3>Label</h3>
        <div className="filter-options">
          {labels.map(label => (
            <label key={label.id} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.labels.includes(label.name)}
                onChange={() => handleLabelToggle(label.name)}
              />
              <span
                className="checkbox-label"
                style={{ color: label.color }}
              >
                ● {label.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Prioritas</h3>
        <div className="filter-options">
          {[
            { value: 'low', label: 'Rendah' },
            { value: 'medium', label: 'Sedang' },
            { value: 'high', label: 'Tinggi' }
          ].map(option => (
            <label key={option.value} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.priority.includes(option.value)}
                onChange={() => handlePriorityToggle(option.value)}
              />
              <span className="checkbox-label">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Deadline Hingga</h3>
        <input
          type="date"
          value={filters.dueDate || ''}
          onChange={handleDateChange}
          className="date-input"
        />
      </div>

      <button className="btn-clear" onClick={handleClearFilters}>
        Hapus Semua Filter
      </button>
    </div>
  );
};

export default FilterPanel;