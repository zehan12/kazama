import { useState } from 'react';
import { useLoader, useAction, request } from 'kizuna';

function App() {
  const [userId, setUserId] = useState(1);

  // 1. useLoader: caching, maxAge, and auto-revalidating
  const { data: user, isLoading, isError, refetch, lastRevalidatedAt } = useLoader({
    key: ['user', String(userId)],
    loader: async () => {
      const data = await request.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      return data;
    },
    maxAge: 10000, // Data stays fresh for 10 seconds
    revalidateInterval: 0, // Change this to 5000 to demo polling
  });

  // 2. useAction: action hook for mutations
  const { mutate, isLoading: isMutating } = useAction(async (newName: string) => {
    const data = await request.patch(`https://jsonplaceholder.typicode.com/users/${userId}`, { name: newName });
    return data;
  });

  const handleUpdateName = () => {
    mutate('Updated Name ' + Math.floor(Math.random() * 1000), {
      onSuccess: () => refetch()
    });
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Advanced React-Store Query Example</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setUserId(Math.max(1, userId - 1))}>Previous User</button>
        <span style={{ margin: '0 10px' }}>User ID: {userId}</span>
        <button onClick={() => setUserId(userId + 1)}>Next User</button>
      </div>

      {isLoading ? (
        <div style={{ padding: 20 }}>Loading user...</div>
      ) : isError ? (
        <div style={{ padding: 20 }}>Error loading user!</div>
      ) : user ? (
        <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8 }}>
          <h2>{user.name} ({user.username})</h2>
          <p>Email: {user.email}</p>
          <p>Website: {user.website}</p>
          <p style={{ color: 'gray', fontSize: 12 }}>
            Last fetched: {lastRevalidatedAt ? new Date(lastRevalidatedAt).toLocaleTimeString() : 'Never'}
          </p>

          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <button onClick={() => refetch()}>
              Manual Refetch
            </button>
            <button onClick={handleUpdateName} disabled={isMutating}>
              {isMutating ? 'Updating...' : 'Mutate Name'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
