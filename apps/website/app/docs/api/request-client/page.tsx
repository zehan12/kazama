import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'HTTP Client | Kazama',
}

const configCode = `import { createStore, request } from 'kazama-core';

// 1. Configure the built-in request client (powered by Axios)
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 2. Pass it to the store configuration
export const store = createStore(models, {
  name: 'AppStore',
  request: request 
});`

const multiInstanceCode = `import { createRequestInstance, setRequestInstance } from 'kazama-core';

// Create a named instance for a specific microservice
const authClient = createRequestInstance('authApi');

authClient.defaults.baseURL = 'https://auth.api.com';

// You can swap the active instance at runtime if needed
setRequestInstance({ baseURL: 'https://api.com' }, authClient);`

export default async function DocsRequestClientPage() {
  return (
    <DocsPageFrame
      eyebrow="api & data fetching"
      title="HTTP Client (request)"
      description="Configure the built-in Axios-powered network layer."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted leading-relaxed">
            <code>kazama</code> exports a pre-configured <code>request</code> object. This is a lightweight wrapper around <strong>Axios</strong>, providing a familiar API for HTTP requests with support for interceptors.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Global Configuration</h2>
          <p className="text-muted leading-relaxed">
            You can configure the default <code>request</code> client by adding interceptors for authentication, error handling, or response transformation. Passing this client into the store configuration ensures that hooks like <code>useRequest</code> use your customized network layer.
          </p>
          <div className="overflow-hidden rounded-[var(--kazama-radius)] border border-line bg-base">
            <CodeBlock code={configCode} lang="typescript" filename="store.ts" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Multiple Instances</h2>
          <p className="text-muted leading-relaxed">
            If your application talks to multiple APIs with different base URLs or authentication strategies, you can use the instance factory methods.
          </p>
          <div className="overflow-hidden rounded-[var(--kazama-radius)] border border-line bg-base">
            <CodeBlock code={multiInstanceCode} lang="typescript" filename="api.ts" />
          </div>
        </div>
      </div>
    </DocsPageFrame>
  )
}
