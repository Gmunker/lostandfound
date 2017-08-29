let date = new Date();

const initialState = {
  animal:{
    "history": [{
      "lat": null, 
      "lng": null, 
      "region": "", 
      "date": "",
      "status": "lost", 
      "UID": "",
      "sex": ""
    }],
    "type": "dog"
  },
  currentAnimal: {type: 'dog'},
  newHistory: {status: "lost"}
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "SET_ANIMAL_INFO": {
      return {
        ...state, 
        animal: action.payload
      }
    }
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
