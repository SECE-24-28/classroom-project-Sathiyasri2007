import { useState } from 'react';
import { transactionAPI } from '../services/api';

const TestConnection = () => {
  const [status, setStatus] = useState('Not tested');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/');
      if (response.ok) {
        setStatus('✅ Backend Connected');
      } else {
        setStatus('❌ Backend Error');
      }
    } catch (error) {
      setStatus('❌ Backend Not Running');
    }
    setLoading(false);
  };

  const testAPI = async () => {
    setLoading(true);
    try {
      await transactionAPI.getTransactions();
      setStatus('✅ API Connected');
    } catch (error) {
      setStatus('❌ API Failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-light p-8">
      <div className="max-w-md mx-auto bg-accent p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-secondary mb-4">Connection Test</h1>
        
        <div className="space-y-4">
          <div>
            <button 
              onClick={testConnection}
              disabled={loading}
              className="w-full bg-primary text-light p-3 rounded"
            >
              Test Backend
            </button>
          </div>
          
          <div>
            <button 
              onClick={testAPI}
              disabled={loading}
              className="w-full bg-secondary text-light p-3 rounded"
            >
              Test API
            </button>
          </div>
          
          <div className="text-center text-lg font-semibold">
            Status: {status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestConnection;