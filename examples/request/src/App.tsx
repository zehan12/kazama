import { useRequest } from './store';

function App() {
  const { data, loading, error, request } = useRequest('/users/1');
  const user = data as any;

  if (loading) return <div style={{ padding: 40 }}>Loading user...</div>;
  if (error) return <div style={{ padding: 40 }}>Error loading user!</div>;

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>useRequest Example (JSONPlaceholder)</h1>
      {user ? (
        <div>
          <h2>{user.name} ({user.username})</h2>
          <p>Email: {user.email}</p>
          <p>Website: {user.website}</p>
          <button onClick={() => request()}>Refetch User</button>
        </div>
      ) : (
        <button onClick={() => request()}>Fetch User</button>
      )}
    </div>
  );
}

export default App;
