let defaultState = {
  name: "",
  location: "",
  gender: "",
  color: "",
  breed: "",
  status: "",
  type: "",
  date: new Date()
}

export default function reducer(state=defaultState, action) {

  switch(action.type) {
    case "SET_NEW_ANIMAL_INFO": {
      return {...action.payload};
    }
  }

  return state;

}

