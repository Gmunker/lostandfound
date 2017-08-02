export default function reducer(state={}, action) {

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
}

