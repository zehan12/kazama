import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'useModel | Musubi',
}

const useModelCode = `import { store } from './store';

function UserProfile() {
  // Returns a tuple: [state, dispatchers]
  const [userState, dispatchers] = store.useModel('user');

  return (
    <div>
      <h1>{userState.name}</h1>
      <button onClick={() => dispatchers.updateName('Alice')}>
        Change Name
      </button>
    </div>
  );
}`

const isolatedCode = `import { store } from './store';

function UserAvatar() {
  // Only subscribes to state, avoiding dispatcher recreation
  const userState = store.useModelState('user');
  return <img src={userState.avatarUrl} alt="Avatar" />;
}

function LogoutButton() {
  // Only subscribes to dispatchers, will never re-render when state changes
  const dispatchers = store.useModelDispatchers('auth');
  return <button onClick={() => dispatchers.logout()}>Logout</button>;
}`

export default async function DocsUseModelPage() {
  return (
    <DocsPageFrame
      eyebrow="react hooks"
      title="useModel"
      description="Subscribe to state and dispatchers for a specific model."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted leading-relaxed">
            The <code>useModel</code> hook is the primary way to interact with your store inside React components. It returns a tuple containing the current state of the requested model and the auto-generated dispatchers.
          </p>
          <div className="overflow-hidden rounded-[var(--musubi-radius)] border border-line bg-base">
            <CodeBlock code={useModelCode} lang="tsx" filename="UserProfile.tsx" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Performance Optimization</h2>
          <p className="text-muted leading-relaxed">
            By default, <code>useModel</code> will re-render your component whenever the state of that specific model changes. If you only need the dispatchers (for example, in a button component) or only need the state, you can use the isolated hooks to prevent unnecessary re-renders.
          </p>
          <div className="overflow-hidden rounded-[var(--musubi-radius)] border border-line bg-base">
            <CodeBlock code={isolatedCode} lang="tsx" filename="OptimizedComponents.tsx" />
          </div>
        </div>
      </div>
    </DocsPageFrame>
  )
}
