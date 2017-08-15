import geoJson from '../GoogleMap/geojson.json'

let defaultState = {
  geoJson,
  dummyData: [{
        Name: "Spot",
        Color: "White",
        Breed: "Great Dame",
        Date: new Date().toString(),
        Location: {
          position: [{
            lat: 36.5571445511326,
            lng: -86.17903900146484
          }],
          key: this.name,
          defaultAnimation: 2
        },
        Type: "Dog",
        Status: ["Found"]
      },{
        Name: "Whiskers",
        Color: "Orange",
        Breed: "Evil",
        Date: new Date().toString(),
        Location: {
          position: [{
            lat: 36.0571445511326,
            lng: -86.97903900146484
          }],
          key: this.name,
          defaultAnimation: 2
        },
        Type: "Cat",
        Status: ["Lost"]
      },{
        Name: "Rusty",
        Color: "White with Black",
        Breed: "Jack Russel",
        Date: new Date().toString(),
        Location: {
          position: [{
            lat: 36.9121445511326,
            lng: -85.17903900146484
          },
          {
            lat: 36.9121445511396,
            lng: -85.77903900141484
          }],
          key: this.name,
          defaultAnimation: 2
        },
        Type: "Dog",
        Status: ["Lost", "Found"]
      }
    ]};

export default function reducers(state=defaultState, action) {
  switch(action.type) {
    
    default: {
      return state
    }
  }
}