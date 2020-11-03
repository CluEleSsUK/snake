import { Direction } from "./Keyboard"
import { config, State } from "./index"

const opposites = new Map([
  [Direction.UP, Direction.DOWN],
  [Direction.DOWN, Direction.UP],
  [Direction.LEFT, Direction.RIGHT],
  [Direction.RIGHT, Direction.LEFT],
])

function changeDirection(state: State, direction: Direction): State {
  /// cannot move 180 degrees in snake!!
  if (direction === opposites.get(state.direction)) {
    return state
  }

  return {
    ...state,
    direction
  }
}

function move(state: State): State {
  const [x, y] = state.snakeHead
  const increment = wrappingIncrement(config.boardSize)
  const decrement = wrappingDecrement(config.boardSize)

  switch (state.direction) {
    // remember y = 0 is top of screen
    case Direction.UP:
      return { ...state, snakeHead: [x, decrement(y)] }
    case Direction.DOWN:
      return { ...state, snakeHead: [x, increment(y)] }
    case Direction.LEFT:
      return { ...state, snakeHead: [decrement(x), y] }
    case Direction.RIGHT:
      return { ...state, snakeHead: [increment(x), y] }
  }
}

const wrappingIncrement = (max: number) => {
  return (value: number) => {
    if (value === max) {
      return 0
    }
    return value + 1
  }
}

const wrappingDecrement = (max: number) => {
  return (value: number) => {
    if (value === 0) {
      return max
    }
    return value - 1
  }
}

export { changeDirection, move }