import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'HTTP Client | React Store',
}

const configCode = `import { setRequestInstance } from '@react-store/core';

// Configure the global default instance
setRequestInstance({
  baseURL: 'https://api.my-app.com/v1',
  timeout: 5000,
  interceptors: {
    request: {
      onConfig: (config) => {
        // Automatically inject auth tokens
        config.headers.Authorization = \`Bearer \${localStorage.getItem('token')}\`;
        return config;
      }
    },
    response: {
      onError: (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          logoutUser();
        }
        return Promise.reject(error);
      }
    }
  }
});`

const usageCode = `import { request } from '@react-store/core';

async function fetchDashboard() {
  // \`request\` is fully typed and supports all standard HTTP verbs
  const users = await request.get('/users');
  
  // Notice: No need to destructure \`res.data\`!
  // By default, \`request\` unwraps the axios response data.
  console.log(users); 
  
  // Sending data
  const newPost = await request.post('/posts', { title: 'Hello World' });
  
  // If you need the full Axios response object (headers, status code):
  const fullRes = await request.get('/config', { withFullResponse: true });
  console.log(fullRes.headers);
}`

const multipleInstancesCode = `import { createRequestInstance, setRequestInstance, request } from '@react-store/core';

// 1. Initialize custom instances
createRequestInstance('billingApi');

// 2. Configure them separately
setRequestInstance({
  baseURL: 'https://billing.my-app.com',
}, requestInstances['billingApi']); // or simply pass the config for that instance

// 3. Use them by specifying \`instanceName\`
const invoice = await request.get('/invoices/123', { 
  instanceName: 'billingApi' 
});`

export default async function DocsRequestPage() {
  return (
    <DocsPageFrame
      eyebrow="Network Layer"
      title="HTTP Client (request)"
      description="A powerful, highly-configured Axios wrapper designed for seamless data extraction and multi-instance API management."
    >
      <div className="flex flex-col gap-12">
        
        {/* Intro */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Why use our request client?</h2>
          <p className="text-muted leading-relaxed">
            Instead of manually configuring <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">axios</code> in every project, <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">@react-store/core</code> exposes a ready-to-use <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">request</code> object. 
            By default, it completely eliminates the boilerplate of unwrapping <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">response.data</code>, while providing a clean API for interceptors and multiple backend services.
          </p>
        </div>

        {/* Global Config Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Global Configuration</h2>
          <p className="text-muted leading-relaxed">
            You can configure the base URL, timeouts, and interceptors application-wide using <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">setRequestInstance</code>. 
            This is typically done once in your <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">index.ts</code> or <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">App.tsx</code>.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={configCode} lang="typescript" filename="network.ts" />
          </div>
        </div>

        {/* Usage Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Usage</h2>
          <p className="text-muted leading-relaxed">
            The <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">request</code> object supports <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">.get()</code>, <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">.post()</code>, <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">.put()</code>, <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">.patch()</code>, and <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">.delete()</code>.
            It automatically returns the payload data, making your async functions significantly cleaner.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={usageCode} lang="typescript" filename="api.ts" />
          </div>
        </div>

        {/* Multi Instance Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fg">Multiple API Instances</h2>
          <p className="text-muted leading-relaxed">
            If your application talks to multiple different microservices (e.g., a main API and a billing API), you can create named instances.
            This allows you to maintain completely separate interceptors and base URLs, while still using the exact same <code className="text-fg bg-surface px-1 py-0.5 rounded text-sm">request</code> import.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base mt-4">
            <CodeBlock code={multipleInstancesCode} lang="typescript" filename="multi-api.ts" />
          </div>
        </div>

      </div>
    </DocsPageFrame>
  )
}
