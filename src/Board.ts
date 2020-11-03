import { State } from "./index"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const context = canvas.getContext("2d")
const squareSize = 10

function drawSquare(color: string) {
  return function ([x, y]: [number, number]) {
    if (context == null) {
      throw Error("Wtf, context wasn't available")
    }
    context.fillStyle = color
    context.fillRect(x, y, squareSize, squareSize)
  }
}

const drawEmptySquare = drawSquare("#FFFFFF")
const drawSnakeSquare = drawSquare("#000000")

export function renderSnake(...states: State[]) {
  states.forEach(it => {
    drawSnakeSquare(it.snakeHead)
  })
}

export function renderEmpty(state: State) {
  drawEmptySquare(state.snakeHead)
}
