import { Direction, startKeyboardMonitor } from "./Keyboard"
import { changeDirection } from "./Actions"
import { createStore } from "./Store"
import { startSnake } from "./RenderLoop"
import { randomPixel, renderEmptyBoard } from "./Board"

export const config = {
  boardSize: 500,
  rendersPerSecond: 10,
  pixelSize: 10
}

export type Pixel = [number, number]

export interface State {
  gameOver: boolean
  direction: Direction
  snake: Array<Pixel>
  foodPosition: Pixel
}

const boardMidPoint = Math.floor(config.boardSize / 2)
export const initialState: State = {
  gameOver: false,
  snake: [[boardMidPoint, boardMidPoint]],
  direction: Direction.RIGHT,
  foodPosition: randomPixel()
}

export const store = createStore(initialState)
renderEmptyBoard()
startSnake(store.getState())
startKeyboardMonitor(direction => store.dispatch(state => changeDirection(state, direction)))

