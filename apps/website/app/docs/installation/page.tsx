import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Installation | React Store',
}

const installCode = `npm install @react-store/core
# or
pnpm add @react-store/core
# or
yarn add @react-store/core
# or
bun add @react-store/core`

const peerDepsCode = `"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0"
}`

export default async function DocsInstallationPage() {
  return (
    <DocsPageFrame
      eyebrow="getting started"
      title="Installation"
      description="Learn how to install @react-store/core and its peer dependencies."
    >
      <div className="flex flex-col gap-12 text-fg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Package Managers</h2>
          <p className="text-muted">
            You can install the library using your preferred Node package manager. The library ships with comprehensive TypeScript definitions out of the box.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base">
            <CodeBlock code={installCode} lang="bash" filename="terminal" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Peer Dependencies</h2>
          <p className="text-muted">
            <code>@react-store/core</code> leverages modern React primitives like <code>useSyncExternalStore</code>. Therefore, it requires React 18 or higher.
          </p>
          <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base">
            <CodeBlock code={peerDepsCode} lang="json" filename="package.json" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Framework Support</h2>
          <p className="text-muted leading-relaxed">
            The library is completely framework agnostic. It seamlessly integrates with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted">
            <li><strong>Next.js</strong> (Pages Router & App Router - Client Components)</li>
            <li><strong>Vite / Create React App</strong></li>
            <li><strong>Remix</strong></li>
            <li><strong>React Native / Expo</strong></li>
          </ul>
        </div>
      </div>
    </DocsPageFrame>
  )
}
