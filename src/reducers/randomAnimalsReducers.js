export default function reducrs(state={}, action) {
  switch(action.type) {
    case "SET_ANIMALS_WITH_PICS": {
      let pics = action.payload
      return pics
    }
    default: {
      return state
    }
  }
}