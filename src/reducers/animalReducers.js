export default function reducer(state={}, action) {

<<<<<<< HEAD
	switch(action.type) {
		case "SET_ANIMAL_INFO": {
			return {...action.payload};
		}
		default: {
			return state;
		}
	}
=======
  switch(action.type) {
    case "SET_ANIMAL_INFO": {
      return {...action.payload};
    }
    default: {
      return state
    }
  }
>>>>>>> d968336d4ceb8fdb8ff4bf572c3dba8718bdd587
}

