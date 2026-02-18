import React from 'react';
import { useModel, useModelEffectsLoading } from '../store';

export function ComplexWorkflowAuth() {
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
