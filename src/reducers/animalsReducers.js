let defaultState = {
  animals: [],
  fetching: false,
  fetched: false,
  error: null
}

export default function reducer(state=defaultState, action) {

  switch(action.type) {
    case "FETCH_ANIMALS": {
      return {...state, fetching: true};
    }
    case "FETCH_ANIMALS_REJECTED": {
      return {...state, fetching: false, error: action.payload};
    }
    case "FETCH_ANIMALS_FULLFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        animals: action.payload
      }
    }
    default: {
      return state
    }
  }
}