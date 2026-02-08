import { useState } from 'react';
import './App.css';
import Clock from './components/Clock';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';
import Reminder from './components/Reminder';
import { FaClock, FaHourglassHalf, FaStopwatch, FaTasks, FaExpand, FaCompress } from 'react-icons/fa';

function App() {
  const [activeTab, setActiveTab] = useState('clock');
  const [focusMode, setFocusMode] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'clock':
        return <Clock />;
      case 'timer':
        return <Timer />;
      case 'stopwatch':
        return <Stopwatch />;
      case 'reminder':
        return <Reminder />;
      default:
        return <Clock />;
    }
  };

  return (
    <div className={`app-container ${focusMode ? 'focus-mode' : ''}`}>
      {!focusMode && (
        <nav className="sidebar">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">FocusStation</span>
          </div>
          <div className="nav-items">
            <button
              className={`nav-item ${activeTab === 'clock' ? 'active' : ''}`}
              onClick={() => setActiveTab('clock')}
            >
              <FaClock /> <span>Clock</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'timer' ? 'active' : ''}`}
              onClick={() => setActiveTab('timer')}
            >
              <FaHourglassHalf /> <span>Timer</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'stopwatch' ? 'active' : ''}`}
              onClick={() => setActiveTab('stopwatch')}
            >
              <FaStopwatch /> <span>Stopwatch</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'reminder' ? 'active' : ''}`}
              onClick={() => setActiveTab('reminder')}
            >
              <FaTasks /> <span>Deadlines</span>
            </button>
          </div>
          <div className="footer-info">
            <p>v1.0.0 Student Ed.</p>
          </div>
        </nav>
      )}

      <main className="main-content">
        <div className="top-bar">
          <h2 className="section-title">
            {activeTab === 'clock' && 'World Time'}
            {activeTab === 'timer' && 'Focus Timer'}
            {activeTab === 'stopwatch' && 'Lab Stopwatch'}
            {activeTab === 'reminder' && 'Assignments'}
          </h2>
          <button className="focus-toggle" onClick={() => setFocusMode(!focusMode)} title="Toggle Focus Mode">
            {focusMode ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
