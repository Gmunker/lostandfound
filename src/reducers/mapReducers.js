let defaultState = {};

export default function reducers(state=defaultState, action) {
  switch(action.type) {
    case "SET_GOOGLE_MAPS": {
      return action.payload
    }
    default: {
      return state
    }
  }
}