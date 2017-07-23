let defaultState = {
  newAnimalInfo: {
    name: "",
    location: "",
    gender: "",
    color: "",
    breed: ""
  },
  newAnimalStatus: {
      statusLost: false,
      statusFound: false,
  },
  newAnimalType: {
      isDog: false,
      isCat: false
  },
  date: ""
}

export default function reducer(state=defaultState, action) {

  switch(action.type) {
    case "SET_NEW_ANIMAL_INFO": {
      return {...state, newAnimalInfo: action.payload};
    }
    case "SET_NEW_ANIMAL_STATUS": {
      return {...state, newAnimalStatus: action.payload}
    }
    case "SET_NEW_ANIMAL_TYPE": {
      return {...state, newAnimalType: action.payload}
    }
  }

  return state;

}

