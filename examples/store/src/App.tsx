import { useModel } from './store';

function App() {
  const [auth, authDispatch] = useModel('auth');

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Client State Example</h1>
      <p>Is Logged In: {auth.isLoggedIn ? 'Yes' : 'No'}</p>
      {auth.isLoggedIn && <p>User: {auth.user?.name}</p>}
      
      {!auth.isLoggedIn ? (
        <button onClick={() => authDispatch.login({ name: 'Admin User' })}>Login</button>
      ) : (
        <button onClick={() => authDispatch.logout()}>Logout</button>
      )}
    </div>
  );
}

export default App;
