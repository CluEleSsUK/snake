import { render } from "./Board"
import { Direction, startKeyboardMonitor } from "./Movement"
import { changeDirection, move } from "./Actions"
import { createStore } from "./Store"

export const config = {
  boardSize: 500,
  rendersPerSecond: 50
}

export interface State {
  gameLost: boolean,
  snakeLength: number,
  snakeHead: [number, number], // x, y
  direction: Direction
}

const boardMidPoint = Math.floor(config.boardSize / 2)
export const initialState: State = {
  gameLost: false,
  snakeLength: 1,
  snakeHead: [boardMidPoint, boardMidPoint],
  direction: Direction.RIGHT,
}

const store = createStore(initialState)
render(initialState)

function startSnake(state: State) {
  render(state)
  setTimeout(() => {
    startSnake(store.dispatch(move))
  }, 1000 / config.rendersPerSecond)
}

startSnake(initialState)
startKeyboardMonitor(direction => store.dispatch(state => changeDirection(state, direction)))

