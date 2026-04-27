import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'useAction | React Store',
}

const actionCode = `import { useAction } from '@react-store/core';
import { request } from '@react-store/core';

async function deleteUser(id: string) {
  return request.delete(\`/api/users/\${id}\`);
}

function UserRow({ user }) {
  const [deleteAction, { isLoading, error }] = useAction(deleteUser);

  const handleDelete = async () => {
    try {
      await deleteAction(user.id);
      // Success logic...
    } catch (err) {
      // Error logic...
    }
  };

  return (
    <div className="flex gap-4">
      <span>{user.name}</span>
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}`

export default async function DocsUseActionPage() {
  return (
    <DocsPageFrame
      eyebrow="api & data fetching"
      title="useAction"
      description="Track loading and error states for independent asynchronous mutations."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted leading-relaxed">
            While <code>useLoader</code> is designed for data fetching and caching (server state), <code>useAction</code> is designed for <strong>mutations</strong> (POST, PUT, DELETE).
          </p>
          <p className="text-muted leading-relaxed">
            It provides a simple wrapper around any asynchronous function to automatically track its <code>isLoading</code> and <code>error</code> states locally within the component.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Usage</h2>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base">
            <CodeBlock code={actionCode} lang="tsx" filename="UserRow.tsx" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Why use useAction?</h2>
          <p className="text-muted leading-relaxed">
            If your mutation modifies data that belongs in the global store, you should define it as an <code>effect</code> in your model. However, if the mutation is strictly localized to a specific component or form, <code>useAction</code> is the perfect lightweight alternative.
          </p>
        </div>
      </div>
    </DocsPageFrame>
  )
}
