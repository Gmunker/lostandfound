let defaultState = {
	animals: [],
	animal: {},
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
		case "FETCH_ANIMAL": {
			return {...state, fetching: true};
		}
		case "FETCH_ANIMAL_REJECTED": {
			return {...state, fetching: false, error: action.payload};
		}
		case "FETCH_ANIMAL_FULLFILLED": {
			return {
				...state,
				fetching: false,
				fetched: true,
				animal: action.payload
			}
		}
		default: {
			return state;
		}
	}
}