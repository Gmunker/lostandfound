const initialState = {
          "name": "", 
          "color": "",
          "history": [{
                "lat": null, 
                "lng": null, 
                "region": "", 
                "date": "",
                "status": "lost", 
                "UID": "",
                "sex": ""
          }],
          "type": "dog", 
          "breed": "",   
          "foster_info": {
              "name": "", 
              "phone": "", 
              "address": "" 
          },
          "owner_info": {
              "name": "", 
              "phone": "", 
              "address": "" 
          },
          "transfer_info": "",
      }

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "SET_ANIMAL_INFO": {
      return {...action.payload};
    }
    default: {
      return state
    }
  }
}
