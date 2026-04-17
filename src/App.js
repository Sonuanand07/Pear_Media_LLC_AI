import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WorkflowText from './components/WorkflowText';
import WorkflowImage from './components/WorkflowImage';
import { AlertCircle } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('text');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('info');
  const [isLoading, setIsLoading] = useState(false);

  const updateStatus = (message, type = 'info') => {
    setStatusMessage(message);
    setStatusType(type);
    if (type !== 'loading') {
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Status Messages */}
{statusMessage && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 fade-in ${
            statusType === 'error' ? 'bg-red-500/20 border border-red-500/50 text-red-100' :
            statusType === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-100' :
            statusType === 'loading' ? 'bg-blue-500/20 border border-blue-500/50 text-blue-100' :
            'bg-blue-500/20 border border-blue-500/50 text-blue-100'
          }`}>
            {statusType === 'error' && <AlertCircle size={20} />}
            {statusType === 'loading' && <div className="spin"><AlertCircle size={20} /></div>}
            <span>{statusMessage}</span>
          </div>
        )}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 p-8 rounded-2xl text-white text-xl animate-pulse">
              Processing...
            </div>
          </div>
        )}


        {/* Tabs */}
        <div className="flex gap-4 mb-8 bg-white/10 backdrop-blur-md p-2 rounded-xl max-w-md">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'text'
                ? 'bg-indigo-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            ✨ Creative Studio
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'image'
                ? 'bg-indigo-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            🎨 Style Lab
          </button>
        </div>

        {/* Content */}
        <div className="fade-in">
          {activeTab === 'text' && (
            <WorkflowText 
              onLoadingChange={setIsLoading}
              onStatusChange={updateStatus}
            />
          )}
          {activeTab === 'image' && (
            <WorkflowImage 
              onLoadingChange={setIsLoading}
              onStatusChange={updateStatus}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
