import { Model } from './types';

export function createModel<State, Reducers, Effects>(model: Model<State, Reducers, Effects>) {
  return model;
}
