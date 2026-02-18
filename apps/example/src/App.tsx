import React from 'react';
import { useModel, useModelState, useModelEffectsLoading, useRequest } from './store';

function BackgroundJobDashboard() {
  // 1. Background Jobs, Retry, and Cancel logic using useRequest
  const { data, loading, error, request, cancel } = useRequest('/api/background-job', {
    manual: true,
    errorRetryCount: 3,
    errorRetryInterval: 1000,
    onSuccess: (res) => console.log('Job successful!', res),
    onError: (err) => console.error('Job failed after retries', err),
  });

  return (
    <div style={{ padding: 20, border: '1px solid #ccc', margin: '20px 0' }}>
      <h2>Background Job Processing</h2>
      <p>Simulates a flaky API that fails twice before succeeding.</p>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => request()} disabled={loading}>
          {loading ? 'Processing...' : 'Start Job'}
        </button>
        <button onClick={cancel} disabled={!loading}>
          Cancel Job
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        {loading && <p style={{ color: 'orange' }}>Attempting to process background job...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        {data && <p style={{ color: 'green' }}>Success: {data.status}</p>}
      </div>
    </div>
  );
}

function ComplexWorkflowAuth() {
  // 2. Complex Workflow (login via store effects)
  const [{ user, isLoggedIn }, dispatchers] = useModel('auth');
  const loading = useModelEffectsLoading('auth');
  
  const handleLogin = async () => {
    try {
      await dispatchers.loginWorkflow('zehan9211');
    } catch (e) {
      alert('Login Failed!');
    }
  };

  return (
    <div style={{ padding: 20, border: '1px solid #ccc', margin: '20px 0' }}>
      <h2>Complex Store Workflow</h2>
      <p>Store effect handles loading, sets intermediate states, and reads Root State.</p>
      
      {isLoggedIn ? (
        <div>
          <p style={{ color: 'green' }}>Welcome back, {user.name} ({user.role})!</p>
        </div>
      ) : (
        <button onClick={handleLogin} disabled={loading.loginWorkflow}>
          {loading.loginWorkflow ? 'Authenticating & Running Checks...' : 'Run Login Workflow'}
        </button>
      )}
    </div>
  );
}

function LargeSharedState() {
  // 3. Handling Large Shared State efficiently
  // By using useModelState, we ONLY re-render when 'selectedId' changes, ignoring the huge dataset
  const selectedId = useModelState('sharedData', state => state.selectedId);
  const [, dispatchers] = useModel('sharedData');
  
  return (
    <div style={{ padding: 20, border: '1px solid #ccc', margin: '20px 0' }}>
      <h2>Large Shared State (1000 items)</h2>
      <p>This component uses granular hooks so it doesn't re-render heavily when the large array is in memory.</p>
      
      <p>Currently Selected ID: <strong>{selectedId !== null ? selectedId : 'None'}</strong></p>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => dispatchers.select(Math.floor(Math.random() * 1000))}>
          Select Random Item
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>@react-store/core - Architecture Showcase</h1>
      <BackgroundJobDashboard />
      <ComplexWorkflowAuth />
      <LargeSharedState />
    </div>
  );
}

export default App;
