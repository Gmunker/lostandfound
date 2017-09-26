const initialState = {
  	currentAnimal: {
			type: 'dog'
		},
  	newHistory: {
		"lat": null, 
		"lng": null, 
		"region": null,
		"status": "lost", 
		"UID": null,
		"sex": "male"
	}
}

export default function reducer(state=initialState, action) {

  	switch(action.type) {
		case "SET_CURRENT_ANIMAL": {
			return {
				...state,
				currentAnimal: action.payload
			}
		}
		case "SET_NEW_HISTORY": {
			return {
				...state,
				newHistory: action.payload
			}
		}
		default: {
			return state
		}
  	}
}
