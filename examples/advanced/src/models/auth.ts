import { createModel } from '@kazama/core';

export const auth = createModel({
  state: {
    user: null as any,
    isLoggedIn: false,
  },
  effects: () => ({
    async loginWorkflow(this: any, payload: string, rootState: any) {
      this.setState({ user: null, isLoggedIn: false });

      try {
        const response = await this.request.post('/api/login', { username: payload });
        
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
