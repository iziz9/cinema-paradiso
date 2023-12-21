interface Action {
  type: 'INCREMENT' | 'DECREMENT' | 'RESET'
}
export const focusIndexReducer = (focusIndex: number, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return focusIndex + 1
    case 'DECREMENT':
      return focusIndex - 1
    case 'RESET':
      return (focusIndex = -1)
    default:
      return focusIndex
  }
}
export const MIN_INDEX = 0
export const MAX_INDEX = 10
export const DEFAULT_INDEX = -1
