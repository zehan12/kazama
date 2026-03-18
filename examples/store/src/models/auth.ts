export const auth = {
  state: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login: (state: any, payload: { name: string }) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
    logout: (state: any) => {
      state.isLoggedIn = false;
      state.user = null;
    }
  }
};
