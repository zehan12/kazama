import { BackgroundJobDashboard } from './components/BackgroundJobDashboard';
import { DirectApiRequest } from './components/DirectApiRequest';
import { ComplexWorkflowAuth } from './components/ComplexWorkflowAuth';
import { LargeSharedState } from './components/LargeSharedState';

function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>kazama - Architecture Showcase</h1>
      <DirectApiRequest />
      <BackgroundJobDashboard />
      <ComplexWorkflowAuth />
      <LargeSharedState />
    </div>
  );
}

export default App;
