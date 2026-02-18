import { createModel } from '@react-store/core';

// Represents a large shared state
export const sharedData = createModel({
  state: {
    dataset: Array.from({ length: 1000 }, (_, i) => ({ id: i, value: `Item ${i}` })),
    selectedId: null as number | null,
  },
  reducers: {
    select(state, payload: number) {
      state.selectedId = payload;
    },
  },
});

export const auth = createModel({
  state: {
    user: null as any,
    isLoggedIn: false,
  },
  effects: (dispatch) => ({
    // Complex workflow example
    async loginWorkflow(payload: string, rootState) {
      // Step 1: Initialize process
      this.setState({ user: null, isLoggedIn: false });

      try {
        // Step 2: Use global request instance injected into 'this.request'
        const response = await this.request.post('/api/login', { username: payload });
        
        // Step 3: Handle large shared state conditionally
        if (rootState.sharedData.dataset.length > 0) {
           console.log("We have a large dataset loaded!");
        }

        this.setState({ user: response, isLoggedIn: true });
      } catch (err) {
        console.error('Login failed', err);
        throw err;
      }
    }
  })
});
