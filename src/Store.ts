function createStore<T>(initialState: T) {
  const states = [initialState]
  const getState = () => {
    return states[states.length - 1] || initialState
  }

  return {
    getState,
    dispatch: (fn: (s: T) => T): T => {
      const currentState = getState()
      const nextState = fn(currentState)
      if (nextState != currentState) {
        states.push(nextState)
      }
      return nextState
    }
  }
}

export { createStore }