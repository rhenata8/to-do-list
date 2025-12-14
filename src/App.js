import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CalendarView from './components/Calendar';
import FilterPanel from './components/Filter';
import ProgressChart from './components/ProgressChart';
import AddTaskModal from './components/AddTaskModal';
import AddLabelModal from './components/AddLabelModal';
import './App.css';

function App() {
  // State untuk tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'coba',
      description: 'Ini adalah tugas pertama',
      dueDate: '2026-02-23',
      priority: 'medium',
      labels: ['Tugas'],
      status: 'todo'
    }
  ]);

  // State untuk labels
  const [labels, setLabels] = useState([
    { id: 1, name: 'Tugas', color: '#3B82F6' },
    { id: 2, name: 'Pekerjaan', color: '#10B981' },
    { id: 3, name: 'Pribadi', color: '#F59E0B' }
  ]);

  // State untuk filters
  const [filters, setFilters] = useState({
    labels: [],
    priority: [],
    dueDate: null
  });

  // State untuk search
  const [searchQuery, setSearchQuery] = useState('');

  // State untuk modal
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddLabelModal, setShowAddLabelModal] = useState(false);

  // State untuk current view
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'calendar', 'filter'

  // Load data dari localStorage saat aplikasi dibuka
  useEffect(() => {
    const savedTasks = localStorage.getItem('kanban_tasks');
    const savedLabels = localStorage.getItem('kanban_labels');

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Error loading tasks:', e);
      }
    }

    if (savedLabels) {
      try {
        setLabels(JSON.parse(savedLabels));
      } catch (e) {
        console.error('Error loading labels:', e);
      }
    }
  }, []);

  // Save tasks ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save labels ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('kanban_labels', JSON.stringify(labels));
  }, [labels]);

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

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Hitung statistik progress
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(t => t.status === 'done').length;
  const inProgressTasks = filteredTasks.filter(t => t.status === 'inprogress').length;
  const todoTasks = filteredTasks.filter(t => t.status === 'todo').length;

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
            tasks={tasks}
            labels={labels}
          />
        );
      case 'filter':
        return (
          <FilterPanel
            labels={labels}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        );
      default:
        return null;
    }
  };

  // Render active filters info
  const renderActiveFilters = () => {
    const activeFilters = [];

    if (filters.labels.length > 0) {
      activeFilters.push(`Label: ${filters.labels.join(', ')}`);
    }

    if (filters.priority.length > 0) {
      const priorityLabels = {
        low: 'Rendah',
        medium: 'Sedang',
        high: 'Tinggi'
      };
      const priorityText = filters.priority.map(p => priorityLabels[p]).join(', ');
      activeFilters.push(`Prioritas: ${priorityText}`);
    }

    if (filters.dueDate) {
      activeFilters.push(`Deadline: ${new Date(filters.dueDate).toLocaleDateString('id-ID')}`);
    }

    return activeFilters;
  };

  const activeFilters = renderActiveFilters();

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Kanban To-Do List</h1>
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
            <span className="nav-icon">📊</span>
            Dashboard
          </button>
          <button
            className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => setCurrentView('calendar')}
          >
            <span className="nav-icon">📅</span>
            Kalender
          </button>
          <button
            className={`nav-item ${currentView === 'filter' ? 'active' : ''}`}
            onClick={() => setCurrentView('filter')}
          >
            <span className="nav-icon">🔍</span>
            Filter
          </button>
        </nav>

        {/* Active Filters Info */}
        {activeFilters.length > 0 && (
          <div className="active-filters">
            <h3>Filter Aktif</h3>
            {activeFilters.map((filter, index) => (
              <div key={index} className="filter-section">
                <p className="filter-label">{filter}</p>
              </div>
            ))}
          </div>
        )}

        {/* Progress Section */}
        <div className="progress-section">
          <h3>Progress Tugas</h3>
          <ProgressChart
            total={totalTasks}
            completed={completedTasks}
            inProgress={inProgressTasks}
            todo={todoTasks}
          />

          <div className="progress-stats">
            <div className="stat">
              <span className="stat-dot" style={{ backgroundColor: '#EF4444' }}></span>
              To Do
              <strong>{todoTasks}</strong>
            </div>
            <div className="stat">
              <span className="stat-dot" style={{ backgroundColor: '#F59E0B' }}></span>
              In Progress
              <strong>{inProgressTasks}</strong>
            </div>
            <div className="stat">
              <span className="stat-dot" style={{ backgroundColor: '#10B981' }}></span>
              Done
              <strong>{completedTasks}</strong>
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
        {/* Header */}
        <header className="main-header">
          <div className="header-title">
            <h2>
              {currentView === 'dashboard' && 'Dashboard'}
              {currentView === 'calendar' && 'Kalender Tugas'}
              {currentView === 'filter' && 'Filter Tugas'}
            </h2>
            <p>
              {currentView === 'dashboard' && 'Kelola tugas Anda dengan sistem Kanban'}
              {currentView === 'calendar' && 'Lihat semua tugas Anda dalam kalender'}
              {currentView === 'filter' && 'Filter tugas berdasarkan kriteria Anda'}
            </p>
          </div>

          <div className="header-actions">
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

        {/* Content Area */}
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

export default App;