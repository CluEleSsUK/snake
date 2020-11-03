import { renderEmpty, renderSnake } from "./Board"
import { move } from "./Actions"
import { config, State, store } from "./index"

function startSnake(state: State) {
  // get one more than snake length so we can erase the last previous snake tail
  const states = store.getLast(state.snakeLength + 1)

  // because turning does not change the snake head position, we must ignore
  // these events when erasing the snake
  const turns = numberOfTurns(states)
  const [oldTailEnd, ...theSnake] = store.getLast(state.snakeLength + 1 + turns)

  renderEmpty(oldTailEnd)
  renderSnake(...theSnake)

  setTimeout(() => {
    startSnake(store.dispatch(move))
  }, 1000 / config.rendersPerSecond)
}

function numberOfTurns(states: State[]): number {
  let turns = 0
  for (let i = 0; i < states.length - 1; i++) {
    if (states[i].direction != states[i + 1].direction) {
      turns++
    }
  }
  return turns
}

export { startSnake }