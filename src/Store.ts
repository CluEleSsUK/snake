function createStore<T>(initialState: T) {
  const states = [initialState]
  const getState = () => states[states.length - 1] || initialState
  const getLast = (howMany: number) => states.slice(states.length - howMany, states.length)

  return {
    getState,
    getLast,
    dispatch: (fn: (s: T) => T): T => {
      const nextState = fn(getState())
      states.push(nextState)
      return nextState
    }
  }
}


export { createStore }