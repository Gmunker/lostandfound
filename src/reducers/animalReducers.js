export default function reducer(state={}, action) {

  switch(action.type) {
    case "SET_ANIMAL_INFO": {
      return {...action.payload};
    }
  }

  return state;

}

