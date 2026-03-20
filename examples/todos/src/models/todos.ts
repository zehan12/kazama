export const todos = {
  state: {
    items: [],
  },
  reducers: {
    setTodos: (state: any, payload: any[]) => {
      state.items = payload;
    },
    removeTodo: (state: any, id: number) => {
      state.items = state.items.filter((item: any) => item.id !== id);
    }
  },
  effects: () => ({
    async fetchTodos(_payload: any, _rootState: any, request: any) {
      const data = await request.get('/todos?_limit=10');
      (this as any).setTodos(data);
    },
    async deleteTodo(id: number, _rootState: any, request: any) {
      await request.delete(`/todos/${id}`);
      (this as any).removeTodo(id);
    }
  })
};
