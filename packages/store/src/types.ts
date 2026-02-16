export interface Model<State = any, Reducers = any, Effects = any> {
  state: State;
  reducers?: Reducers;
  effects?: (dispatch: any) => Effects;
}

export interface StoreConfig {
  name?: string;
}
