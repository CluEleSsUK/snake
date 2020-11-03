import { renderEmpty, renderSnake } from "./Board"
import { move } from "./Actions"
import { config, State, store } from "./index"

function startSnake(state: State) {
  // get one more than snake length so we can erase the last previous snake tail
  const [toErase, ...theSnake] = store.getLast(state.snakeLength + 1)

  renderEmpty(toErase)
  renderSnake(...theSnake)

  setTimeout(() => {
    startSnake(store.dispatch(move))
  }, 1000 / config.rendersPerSecond)
}

export { startSnake }