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
            Id: animalId,
            ...animals[animalId]
          });
        });
        dispatch({type: "FETCH_ANIMALS_FULLFILLED",payload: parsedAnimals}) 
      })
    }
  }

export function fetchAnimal(id) {
  return function(dispatch) {
    firebaseRef.ref('/Animals/' + id)
    .on('value', (snapshot) => {
      let animal = {...snapshot.val(), Id: id} || {};
      
      dispatch({type: "FETCH_ANIMAL_FULLFILLED",payload: animal})
      dispatch({type: "SET_ANIMAL_INFO", payload: animal})
    })
  }
}


// this.firebaseRef = firebase.database().ref("Animals");
// 		this.firebaseRef.on('value', function(dataSnapshot) {
// 		var Animals = [];
// 		dataSnapshot.forEach(function(childSnapshot) {
// 			var Animal = childSnapshot.val();
// 			Animal['key'] = childSnapshot.key;
// 			Animals.push(Animal);
// 		});