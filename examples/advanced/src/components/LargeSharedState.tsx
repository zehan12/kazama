import { useModel, useModelState } from '../store';

export function LargeSharedState() {
  const state = useModelState('sharedData');
  const selectedId = state?.selectedId ?? null;
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
