export default function reducrs(state=[], action) {
  switch(action.type) {
    case "SET_ANIMALS_WITH_PICS": {
      return action.payload
    }
    default: {
      return state
    }
  }
}