let defaultState = {
  Name: "",
  Location: "",
  Gender: "",
  Color: "",
  Breed: "",
  Status: "",
  Type: "",
  Date: ""
}

export default function reducer(state=defaultState, action) {

  switch(action.type) {
    case "SET_NEW_ANIMAL_INFO": {
      return {...action.payload};
    }
  }

  return state;

}

