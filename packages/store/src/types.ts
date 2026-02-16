export interface Model<State = any, Reducers = any, Effects = any> {
  state: State;
  reducers?: Reducers;
  effects?: (dispatch: any) => Effects;
}

export interface PersistConfig {
  key: string;
  storage?: 'localStorage' | 'sessionStorage';
  allowlist?: string[];
}

export interface StoreConfig {
  name?: string;
  persist?: PersistConfig;
}
