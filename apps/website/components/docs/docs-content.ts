export const docsNav = [
  {
    title: 'Getting Started',
    items: [
      { href: '/docs', label: 'Overview', description: 'What is kazama?' },
      { href: '/docs/installation', label: 'Installation', description: 'Install the package' },
      { href: '/docs/quick-start', label: 'Quick Start', description: 'Build your first store' },
      { href: '/docs/core-concepts', label: 'Core Concepts', description: 'Learn the fundamental concepts' },
    ]
  },
  {
    title: 'Store Management',
    items: [
      { href: '/docs/state-and-reducers', label: 'State & Reducers', description: 'Managing synchronous state' },
      { href: '/docs/async-effects', label: 'Async Effects', description: 'Handling side-effects' },
      { href: '/docs/time-travel', label: 'Time Travel', description: 'Undo/Redo capabilities' },
      { href: '/docs/persistence', label: 'State Persistence', description: 'Local and session storage' },
    ]
  },
  {
    title: 'React Hooks',
    items: [
      { href: '/docs/hooks/use-model', label: 'useModel', description: 'Subscribe to store state' },
      { href: '/docs/hooks/use-model-effects', label: 'Effects State', description: 'Loading and error states' },
      { href: '/docs/hooks/use-query-state', label: 'useQueryState', description: 'URL state management' },
    ]
  },
  {
    title: 'API & Data Fetching',
    items: [
      { href: '/docs/api/use-loader', label: 'useLoader', description: 'Advanced server state management' },
      { href: '/docs/api/use-action', label: 'useAction', description: 'Handling mutations' },
      { href: '/docs/api/use-request', label: 'useRequest', description: 'Ahooks useRequest wrapper' },
      { href: '/docs/api/request-client', label: 'HTTP Client', description: 'Built-in axios wrapper' },
    ]
  },
  {
    title: 'Advanced Guides',
    items: [
      { href: '/docs/typescript', label: 'TypeScript Guide', description: 'Typing models and state' },
      { href: '/docs/configuration', label: 'Configuration', description: 'Store options and defaults' },
      { href: '/docs/best-practices', label: 'Best Practices', description: 'Recommended patterns' },
      { href: '/docs/performance', label: 'Performance', description: 'Optimization techniques' },
      { href: '/docs/troubleshooting', label: 'Troubleshooting', description: 'Common issues and FAQs' },
    ]
  },
  {
    title: 'Reference',
    items: [
      { href: '/docs/api', label: 'Core API', description: 'Complete API reference for functions and configurations' },
    ]
  }
];
