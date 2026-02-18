import React from 'react';
import { useRequest } from '../store';

export function DirectApiRequest() {
  const { data, loading, error } = useRequest('/api/dashboard-stats', { manual: false });

  return (
    <div style={{ padding: 20, border: '1px solid #ccc', margin: '20px 0', backgroundColor: '#f9f9f9' }}>
      <h2>Direct API Request (Auto-fetch)</h2>
      <p>This component uses <code>useRequest</code> to fetch data directly on mount, without going through the store effects.</p>
      
      {loading ? (
        <p>Loading stats directly from API...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error loading stats</p>
      ) : (
        <div>
          <p><strong>Active Users:</strong> {data?.activeUsers}</p>
          <p><strong>Total Sales:</strong> ${data?.totalSales}</p>
        </div>
      )}
    </div>
  );
}
