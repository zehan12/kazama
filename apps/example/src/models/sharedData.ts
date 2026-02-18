import { createModel } from '@react-store/core';

export const sharedData = createModel({
  state: {
    dataset: Array.from({ length: 1000 }, (_, i) => ({ id: i, value: `Item ${i}` })),
    selectedId: null as number | null,
  },
  reducers: {
    select(state: any, payload: number) {
      state.selectedId = payload;
    },
  },
});
