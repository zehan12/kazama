export const filters = {
  state: {
    query: '',
    page: 1,
    availableOnly: false,
    categories: [] as string[],
  },
  reducers: {
    setQuery(state: any, payload: string) {
      state.query = payload;
    },
    setPage(state: any, payload: number) {
      state.page = payload;
    },
    setAvailableOnly(state: any, payload: boolean) {
      state.availableOnly = payload;
    },
    setCategories(state: any, payload: string[]) {
      state.categories = payload;
    }
  }
};
