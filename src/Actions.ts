import { config, Pixel, State } from "./index"
import { Direction } from "./Keyboard"
import { randomPixel, samePixel } from "./Board"

const opposites = new Map([
  [Direction.UP, Direction.DOWN],
  [Direction.DOWN, Direction.UP],
  [Direction.LEFT, Direction.RIGHT],
  [Direction.RIGHT, Direction.LEFT],
])

function changeDirection(state: State, direction: Direction): State {
  /// cannot move 180 degrees in snake!!
  if (direction === state.direction || direction === opposites.get(state.direction)) {
    return state
  }

  return {
    ...state,
    direction
  }
}

function moveSnake(state: State): State {
  const next = nextSquare(state.direction, state.snake[state.snake.length - 1])

  if (isSnakePixel(state, next)) {
    return gameOver(state)
  }

  if (isFoodPixel(state, next)) {
    return respawnFood(growSnake(state, next))
  }

  return moveSnakeTo(state, next)
}

function isSnakePixel(state: State, pixel: Pixel): boolean {
  return state.snake.some(it => samePixel(it, pixel))
}

function isFoodPixel(state: State, pixel: Pixel): boolean {
  return samePixel(state.foodPosition, pixel)
}

function gameOver(state: State): State {
  return {
    ...state,
    gameOver: true
  }
}

function respawnFood(state: State): State {
  return {
    ...state,
    foodPosition: randomPixel()
  }
}

function growSnake(state: State, next: Pixel) {
  return {
    ...state,
    snake: [...state.snake, next]
  }
}

function moveSnakeTo(state: State, next: Pixel): State {
  return {
    ...state,
    snake: [...state.snake.slice(1, state.snake.length), next],
  }
}

function nextSquare(direction: Direction, [x, y]: [number, number]): [number, number] {
  const increment = wrappingIncrement(config.boardSize)
  const decrement = wrappingDecrement(config.boardSize)

  switch (direction) {
    // remember y = 0 is top of screen
    case Direction.UP:
      return [x, decrement(y)]
    case Direction.DOWN:
      return [x, increment(y)]
    case Direction.LEFT:
      return [decrement(x), y]
    case Direction.RIGHT:
      return [increment(x), y]
  }
}

const wrappingIncrement = (max: number) => {
  return (value: number) => {
    if (value === max) {
      return 0
    }
    return value + config.pixelSize
  }
}

const wrappingDecrement = (max: number) => {
  return (value: number) => {
    if (value === 0) {
      return max
    }
    return value - config.pixelSize
  }
}

export { changeDirection, moveSnake }
