export default function reducer(state={}, action) {

<<<<<<< HEAD
	switch(action.type) {
		case "USER_LOGIN": {
			return {...state, uid: action.payload};
		}
		case "USER_LOGOUT": {
			return {}
		}
		default: {
			return state;
		}
	}
=======
  switch(action.type) {
    case "USER_LOGIN": {
      return {...state, uid: action.payload};
    }
    case "USER_LOGOUT": {
      return {}
    }
    default: {
     return state 
    }
  }

>>>>>>> d968336d4ceb8fdb8ff4bf572c3dba8718bdd587
}

