import { createStore } from 'kazama-core';

export const models = {
  settings: {
    state: {
      theme: 'dark',
      notifications: true
    },
    reducers: {
      toggleTheme(state: any) {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
      },
      toggleNotifications(state: any) {
        state.notifications = !state.notifications;
      }
    }
  },
  counter: {
    state: {
      count: 0
    },
    reducers: {
      increment(state: { count: number }) {
        state.count += 1;
      },
      decrement(state: { count: number }) {
        state.count -= 1;
      },
      add5(state: { count: number }) {
        state.count += 5;
      },
      sub5(state: { count: number }) {
        state.count -= 5;
      },
      mul5(state: { count: number }) {
        state.count *= 5;
      },
      pow2(state: { count: number }) {
        state.count = Math.pow(state.count, 2);
      },
      reset(state: { count: number }) {
        state.count = 0;
      }
    }
  },
  todos: {
    state: {
      items: [
        { id: 1, text: 'Learn Kazama', done: true },
        { id: 2, text: 'Master deeply nested state', done: false },
      ],
      filter: 'all' // 'all', 'active', 'completed'
    },
    reducers: {
      toggle(state: any, id: number) {
        // Deeply nested mutation made trivial by Immer!
        const item = state.items.find((i: any) => i.id === id);
        if (item) item.done = !item.done;
      },
      add(state: any, text: string) {
        if (text.trim()) {
          state.items.unshift({ id: Date.now(), text: text.trim(), done: false });
        }
      },
      remove(state: any, id: number) {
        const index = state.items.findIndex((i: any) => i.id === id);
        if (index !== -1) state.items.splice(index, 1);
      },
      setFilter(state: any, filter: string) {
        state.filter = filter;
      }
    },
    effects: (dispatch: any) => ({
      async sync() {
        // Automatically tracks loading state!
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    })
  }
};

const store = createStore(models, {
  name: 'DemoStore',
  persist: {
    key: 'react-store-demo',
    storage: 'localStorage',
    allowlist: ['settings']
  }
});

export const { useModel, useModelState, useModelDispatchers, useModelEffectsLoading, useModelEffectsError, useRequest } = store;
export default store;
