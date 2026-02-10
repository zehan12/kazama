import { createStore } from '@react-store/core';

export const models = {
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
      }
    }
  },
  user: {
    state: {
      username: 'Guest',
      id: '000'
    },
    reducers: {
      update(state: { username: string, id: string }, payload: { username: string, id: string }) {
        state.username = payload.username;
        state.id = payload.id;
      },
      reset(state: { username: string, id: string }) {
        state.username = 'Guest';
        state.id = '000';
      }
    },
    effects: (dispatch: any) => ({
      async getUserInfo() {
        const randomId = Math.floor(Math.random() * 10) + 1;
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${randomId}`);
        const data = await response.json();
        dispatch.user.update({ username: data.username, id: String(data.id) });
      }
    })
  }
};

export default createStore(models, { name: 'DemoStore' });
