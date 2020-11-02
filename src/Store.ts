function createStore<T>(initialState: T) {
  let state = initialState

  return {
    getState: () => state,
    dispatch: (fn: (s: T) => T): T => {
      state = fn(state)
      return state
    }
  }
}

export { createStore }