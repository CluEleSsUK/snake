export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

function startKeyboardMonitor(onDirectionChanged: (d: Direction) => any) {
  document.addEventListener("keydown", (event) => {
    const key = directionFromKey(event.key)
    if (key === null) {
      return
    }
    onDirectionChanged(key)
  })
}

// null if unknown key
function directionFromKey(key: string): Direction | null {
  switch (key) {
    case "ArrowUp":
    case "w":
      return Direction.UP

    case "ArrowLeft":
    case "a":
      return Direction.LEFT

    case "ArrowRight":
    case "d":
      return Direction.RIGHT

    case "ArrowDown":
    case "s":
      return Direction.DOWN

    default:
      return null
  }
}

export { startKeyboardMonitor }
