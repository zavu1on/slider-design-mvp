import type { StoreApi, UseBoundStore } from 'zustand';

type ExtractState<S> = S extends { getState: () => infer T } ? T : never;

type WithSelectors<S extends UseBoundStore<StoreApi<object>>> = S & {
  selectors: {
    [K in keyof ExtractState<S>]: (
      state: ExtractState<S>
    ) => ExtractState<S>[K];
  };
};

export function withSelectors<S extends UseBoundStore<StoreApi<object>>>(
  store: S
): WithSelectors<S> {
  const typedStore = store as WithSelectors<S>;
  typedStore.selectors = {} as WithSelectors<S>['selectors'];

  for (const key of Object.keys(store.getState()) as Array<
    keyof ExtractState<S>
  >) {
    typedStore.selectors[key] = (state) => state[key];
  }

  return typedStore;
}
