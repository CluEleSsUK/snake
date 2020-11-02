import { Direction } from "./Movement"
import { State } from "./index"

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
  switch (state.direction) {
    // remember y = 0 is top of screen
    case Direction.UP:
      return { ...state, snakeHead: [x, y - 1] }
    case Direction.DOWN:
      return { ...state, snakeHead: [x, y + 1] }
    case Direction.LEFT:
      return { ...state, snakeHead: [x - 1, y] }
    case Direction.RIGHT:
      return { ...state, snakeHead: [x + 1, y] }
  }
}

export { changeDirection, move }