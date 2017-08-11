const initialState = {
  Type: "dog",
  Status: "lost"
}
export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "SET_ANIMAL_INFO": {
      return {...action.payload};
    }
    default: {
      return state
    }
  }
}
