import { useEffect } from 'react';
import { useModel, useModelEffectsLoading } from './store';

function App() {
  const [todos, todosDispatch] = useModel('todos');
  const loading = useModelEffectsLoading('todos');

  useEffect(() => {
    todosDispatch.fetchTodos();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Todo App with Store Effects</h1>
      
      {loading.fetchTodos ? (
        <p>Loading todos...</p>
      ) : (
        <ul>
          {todos.items.map((todo: any) => (
            <li key={todo.id} style={{ marginBottom: 10 }}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
              <button 
                style={{ marginLeft: 10 }}
                onClick={() => todosDispatch.deleteTodo(todo.id)}
                disabled={loading.deleteTodo}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
