import { renderEmpty, renderFood, renderSnake } from "./Board"
import { moveSnake } from "./Actions"
import { config, initialState, State, store } from "./index"

function startSnake(state: State) {
  const nextState = store.dispatch(moveSnake)

  if (nextState.gameOver) {
    alert("Game over! Dismiss to restart.")
    startSnake(initialState)
    return
  }

  state.snake
    .filter(it => !nextState.snake.includes(it))
    .forEach(renderEmpty)

  renderSnake(nextState)
  renderFood(nextState)

  setTimeout(() => {
    startSnake(nextState)
  }, 1000 / config.rendersPerSecond)
}

export { startSnake }