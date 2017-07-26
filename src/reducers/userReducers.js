export default function reducer(state={}, action) {

  switch(action.type) {
    case "SET_USER": {
      return {...action.payload};
    }
  }

  return state;

}

