import React from 'react';
import ReactDOM from 'react-dom';
import { RPGGenerator } from './components/RPGGenerator.js';
import { RPGGallery } from './components/RPGGallery.js';
import { useMultiplayer } from './hooks/useMultiplayer.js';

const App = () => {
  const { room, rpgs, addRPG, loading } = useMultiplayer();
  const [activeTab, setActiveTab] = React.useState('create');

  return (
    <div className="app-container">
      <header className="header">
        <h1>This RPG Does Not Exist</h1>
        <p>Generate fantastical role-playing games that have never existed... until now!</p>
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'create' ? 'active' : ''}`} 
          onClick={() => setActiveTab('create')}>
          Create New RPG
        </button>
        <button 
          className={`tab ${activeTab === 'gallery' ? 'active' : ''}`} 
          onClick={() => setActiveTab('gallery')}>
          Gallery ({rpgs.length})
        </button>
      </div>

      {activeTab === 'create' && (
        <RPGGenerator onRPGCreated={addRPG} />
      )}

      {activeTab === 'gallery' && (
        <RPGGallery rpgs={rpgs} loading={loading} />
      )}
    </div>
  );
};

const rootElement = document.getElementById('app');
ReactDOM.createRoot(rootElement).render(<App />);

