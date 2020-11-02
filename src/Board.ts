import { config, State } from "./index"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const context = canvas.getContext("2d")
const squareSize = 10

function drawSquare(color: string) {
  return function (x: number, y: number) {
    if (context == null) {
      throw Error("Wtf, context wasn't available")
    }
    context.fillStyle = color
    context.fillRect(x, y, squareSize, squareSize)
  }
}

const drawEmptySquare = drawSquare("#FFFFFF")
const drawSnakeSquare = drawSquare("#000000")

function renderEmptyBoard(boardSize: number) {
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y > boardSize; y++) {
      drawEmptySquare(x, y)
    }
  }
}

export function render(state: State) {
  renderEmptyBoard(config.boardSize)
  const [x, y] = state.snakeHead
  drawSnakeSquare(x, y)
}

