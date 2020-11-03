import { Direction, startKeyboardMonitor } from "./Keyboard"
import { changeDirection } from "./Actions"
import { createStore } from "./Store"
import { startSnake } from "./RenderLoop"

export const config = {
  boardSize: 500,
  rendersPerSecond: 5
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
  snakeLength: 5,
  snakeHead: [boardMidPoint, boardMidPoint],
  direction: Direction.RIGHT,
}

export const store = createStore(initialState)
startSnake(store.getState())
startKeyboardMonitor(direction => store.dispatch(state => changeDirection(state, direction)))

