import React from 'react';
import { useRequest } from '../store';

export function BackgroundJobDashboard() {
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
