import { createModel } from 'kazama-core';

export const sharedData = createModel({
  state: {
    dataset: Array.from({ length: 1000 }, (_, i) => ({ id: i, value: `Item ${i}` })),
    selectedId: null as number | null,
  },
  reducers: {
    select(state: any, id: number) {
      state.selectedId = id;
    }
  }
});

export * from './auth';
