import { config, Pixel, State } from "./index"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const context = canvas.getContext("2d")

function drawSquare(color: string) {
  return function ([x, y]: [number, number]) {
    if (context == null) {
      throw Error("Wtf, context wasn't available")
    }
    context.fillStyle = color
    context.fillRect(x, y, config.pixelSize, config.pixelSize)
  }
}

const drawEmptySquare = drawSquare("#000000")
const drawSnakeSquare = drawSquare("#FFFFFF")
const drawFoodSquare = drawSquare("#00FF00")

function renderSnake(state: State) {
  state.snake.forEach(drawSnakeSquare)
}

function renderEmpty(pixel: Pixel) {
  drawEmptySquare(pixel)
}

function renderFood(state: State) {
  drawFoodSquare(state.foodPosition)
}

function renderEmptyBoard() {
  for (let x = 0; x < config.boardSize; x++) {
    for (let y = 0; y < config.boardSize; y++) {
      drawEmptySquare([x, y])
    }
  }
}

function randomPixel(): [number, number] {
  // -2 because we don't want to spawn food on the very outside edge
  const randomCoord = () => Math.ceil(Math.random() * (config.boardSize - 2) / 10) * 10
  const x = randomCoord()
  const y = randomCoord()

  return [x, y]
}

function samePixel([ax, ay]: Pixel, [bx, by]: Pixel) {
  return ax == bx && ay == by
}

export { renderSnake, renderFood, renderEmpty, renderEmptyBoard, randomPixel, samePixel }