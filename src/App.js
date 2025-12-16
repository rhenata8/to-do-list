import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CalendarView from './components/Calendar';
import ProgressChart from './components/ProgressChart';
import AddTaskModal from './components/AddTaskModal';
import AddLabelModal from './components/AddLabelModal';
import './App.css';

function App() {
  // ==========================================
  // 1. STATE INITIALIZATION (PERBAIKAN UTAMA)
  // ==========================================
  
  // State untuk tasks - Membaca localStorage langsung saat inisialisasi
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('flowrence_tasks');
    try {
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (e) {
      console.error('Error parsing tasks:', e);
      return [];
    }
  });

  // State untuk labels - Membaca localStorage langsung saat inisialisasi
  const [labels, setLabels] = useState(() => {
    const savedLabels = localStorage.getItem('flowrence_labels');
    try {
      return savedLabels ? JSON.parse(savedLabels) : [
        // Default labels jika belum ada data tersimpan
        { id: 1, name: 'Tugas', color: '#3B82F6' },
        { id: 2, name: 'Pekerjaan', color: '#10B981' },
        { id: 3, name: 'Pribadi', color: '#F59E0B' }
      ];
    } catch (e) {
      return [
        { id: 1, name: 'Tugas', color: '#3B82F6' },
        { id: 2, name: 'Pekerjaan', color: '#10B981' },
        { id: 3, name: 'Pribadi', color: '#F59E0B' }
      ];
    }
  });

  // ==========================================
  // 2. STATE LAINNYA
  // ==========================================

  const [filters, setFilters] = useState({
    labels: [],
    priority: [],
    dueDate: null
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddLabelModal, setShowAddLabelModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  // ==========================================
  // 3. EFFECTS (HANYA UNTUK SAVE)
  // ==========================================

  // Save tasks ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('flowrence_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save labels ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('flowrence_labels', JSON.stringify(labels));
  }, [labels]);

  // ==========================================
  // 4. LOGIC & HANDLERS
  // ==========================================

  // Filter dan search tasks
  const getFilteredTasks = () => {
    let filtered = tasks;

    // Filter berdasarkan search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter berdasarkan labels
    if (filters.labels.length > 0) {
      filtered = filtered.filter(task =>
        task.labels.some(label => filters.labels.includes(label))
      );
    }

    // Filter berdasarkan priority
    if (filters.priority.length > 0) {
      filtered = filtered.filter(task =>
        filters.priority.includes(task.priority)
      );
    }

    // Filter berdasarkan due date
    if (filters.dueDate) {
      filtered = filtered.filter(task =>
        task.dueDate <= filters.dueDate
      );
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  // Handle tambah task
  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData
    };
    setTasks([...tasks, newTask]);
    setShowAddTaskModal(false);
  };

  // Handle update task
  const handleUpdateTask = (taskId, updates) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  // Handle delete task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Handle tambah label
  const handleAddLabel = (labelData) => {
    const newLabel = {
      id: Date.now(),
      ...labelData
    };
    setLabels([...labels, newLabel]);
    setShowAddLabelModal(false);
  };

  // Handle label filter toggle
  const handleLabelToggle = (labelName) => {
    const newLabels = filters.labels.includes(labelName)
      ? filters.labels.filter(l => l !== labelName)
      : [...filters.labels, labelName];
    setFilters({ ...filters, labels: newLabels });
  };

  // Handle priority filter toggle
  const handlePriorityToggle = (priority) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    setFilters({ ...filters, priority: newPriorities });
  };

  // Handle date filter change
  const handleDateChange = (e) => {
    setFilters({ ...filters, dueDate: e.target.value || null });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({ labels: [], priority: [], dueDate: null });
  };

  // Hitung statistik progress
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(t => t.status === 'done').length;
  const inProgressTasks = filteredTasks.filter(t => t.status === 'inprogress').length;
  const todoTasks = filteredTasks.filter(t => t.status === 'todo').length;

  const todoPercentage = totalTasks > 0 ? Math.round((todoTasks / totalTasks) * 100) : 0;
  const inProgressPercentage = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const donePercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Render content berdasarkan current view
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            tasks={filteredTasks}
            labels={labels}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'calendar':
        return (
          <CalendarView
            tasks={filteredTasks}
            labels={labels}
          />
        );
      default:
        return null;
    }
  };

  const hasActiveFilters = filters.labels.length > 0 || filters.priority.length > 0 || filters.dueDate;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Flowrence</h1>
          <p className="sidebar-subtitle">Task Management</p>
        </div>

        {/* Search */}
        <div className="search-container">
          <Search size={18} color="#9CA3AF" />
          <input
            type="text"
            className="search-input"
            placeholder="Cari tugas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => setCurrentView('calendar')}
          >
            Kalender
          </button>
        </nav>

        {/* Progress Section */}
        <div className="progress-section">
          <h3>Progress Tugas</h3>
          <ProgressChart
            total={totalTasks}
            todoPercentage={todoPercentage}
            inProgressPercentage={inProgressPercentage}
            donePercentage={donePercentage}
          />

          <div className="progress-stats">
            <div className="stat">
              <span className="stat-dot" style={{ backgroundColor: '#EF4444' }}></span>
              To Do
              <strong>{todoTasks} ({todoPercentage}%)</strong>
            </div>
            <div className="stat">
              <span className="stat-dot" style={{ backgroundColor: '#F59E0B' }}></span>
              In Progress
              <strong>{inProgressTasks} ({inProgressPercentage}%)</strong>
            </div>
            <div className="stat">
              <span className="stat-dot" style={{ backgroundColor: '#10B981' }}></span>
              Done
              <strong>{completedTasks} ({donePercentage}%)</strong>
            </div>
          </div>

          <div className="overall-progress">
            <p>Progress Keseluruhan</p>
            <strong>{totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%</strong>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-title">
            <h2>
              {currentView === 'dashboard' && 'Dashboard'}
              {currentView === 'calendar' && 'Kalender Tugas'}
            </h2>
            <p>
              {currentView === 'dashboard' && 'Kelola tugas Anda dengan efisien'}
              {currentView === 'calendar' && 'Lihat semua tugas Anda dalam kalender'}
            </p>
          </div>

          <div className="header-actions">
            {/* Filter Dropdown Button */}
            <div className="filter-dropdown-container">
              <button
                className={`btn-filter ${hasActiveFilters ? 'active' : ''}`}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <Filter size={18} />
                Filter
                {hasActiveFilters && <span className="filter-badge">{filters.labels.length + filters.priority.length + (filters.dueDate ? 1 : 0)}</span>}
              </button>

              {/* Filter Dropdown */}
              {showFilterDropdown && (
                <div className="filter-dropdown">
                  <div className="filter-dropdown-header">
                    <h3>Filter Tugas</h3>
                    <button className="btn-close" onClick={() => setShowFilterDropdown(false)}>
                      <X size={20} />
                    </button>
                  </div>

                  <div className="filter-dropdown-content">
                    {/* Label Filter */}
                    <div className="filter-section">
                      <h4>Label</h4>
                      <div className="filter-options">
                        {labels.map(label => (
                          <label key={label.id} className="filter-checkbox">
                            <input
                              type="checkbox"
                              checked={filters.labels.includes(label.name)}
                              onChange={() => handleLabelToggle(label.name)}
                            />
                            <span className="checkbox-label" style={{ color: label.color }}>
                              ● {label.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Priority Filter */}
                    <div className="filter-section">
                      <h4>Prioritas</h4>
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

                    {/* Date Filter */}
                    <div className="filter-section">
                      <h4>Deadline Hingga</h4>
                      <input
                        type="date"
                        value={filters.dueDate || ''}
                        onChange={handleDateChange}
                        className="date-input"
                      />
                    </div>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                      <button className="btn-clear-filters" onClick={handleClearFilters}>
                        Hapus Semua Filter
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              className="btn-secondary"
              onClick={() => setShowAddLabelModal(true)}
            >
              Tambah Label
            </button>
            <button
              className="btn-primary"
              onClick={() => setShowAddTaskModal(true)}
            >
              <Plus size={20} />
              Tambah Tugas
            </button>
          </div>
        </header>

        <div className="content-area">
          {renderContent()}
        </div>
      </main>

      {/* Modals */}
      {showAddTaskModal && (
        <AddTaskModal
          labels={labels}
          onClose={() => setShowAddTaskModal(false)}
          onSubmit={handleAddTask}
        />
      )}

      {showAddLabelModal && (
        <AddLabelModal
          onClose={() => setShowAddLabelModal(false)}
          onSubmit={handleAddLabel}
        />
      )}
    </div>
  );
}

export default App;""