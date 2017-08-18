const initialState = {
<<<<<<< HEAD
  type: "dog",
  status: "lost"
}
=======
          "name": "", 
          "color": "",
          "history": {
              "positions": [{
                  "lat": null, 
                  "lng": null, 
                  "region": "", 
                  "date": "",
                  "status": "dog", 
                  "UID": "" 
              }]
          },
          "type": "dog", 
          "breed": "", 
          "sex": "",  
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
          "transfer_info": ""
      }

>>>>>>> d36d7a552116ff1e56e79e4e1fbfc8ef69f424ce
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
