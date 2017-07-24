import firebase from '../firebase';
const firebaseRef = firebase.database();

export function fetchAnimals(type, status) {
  return function(dispatch) {
     firebaseRef.ref('Animals')
      .on('value', (snapshot) => {
        let animals = snapshot.val() || {};
        let parsedAnimals = [];

        Object.keys(animals).forEach((animalId) => {
          parsedAnimals.push({
            id: animalId,
            ...animals[animalId]
          });
        });

        

        
        dispatch({type: "FETCH_ANIMALS_FULLFILLED",payload: parsedAnimals}) 
      })
    }
  }







  // export function fetchEvent(id) {
  //   return function(dispatch) {
  //    eventsRef.ref('/events/' + id)
  //     .on('value', (snapshot) => {
  //       let event = snapshot.val() || {};
        
  //       dispatch({type: "FETCH_EVENT_FULLFILLED",payload: event}) 
  //     })
  //   }
  // }


// this.firebaseRef = firebase.database().ref("Animals");
// 		this.firebaseRef.on('value', function(dataSnapshot) {
// 		var Animals = [];
// 		dataSnapshot.forEach(function(childSnapshot) {
// 			var Animal = childSnapshot.val();
// 			Animal['key'] = childSnapshot.key;
// 			Animals.push(Animal);
// 		});