import firebase from '../firebase';
const firebaseRef = firebase.database();

export function fetchAnimals() {
  return function(dispatch) {
     firebaseRef.ref('HipD')
      .on('value', (snapshot) => {
        let animals = snapshot.val() || {};
        let parsedAnimals = [];

        Object.keys(animals).forEach((animalId) => {
          parsedAnimals.push({
            Id: animalId,
            ...animals[animalId]
          });
        });

        let animalsWithPics = parsedAnimals.filter(animal => animal.Image)
        // let random = Math.round(Math.random() * animalsWithPics.length - 1);

        // console.log(animalsWithPics)
        dispatch({type: "FETCH_ANIMALS_FULLFILLED",payload: parsedAnimals}) 
        dispatch({type: "SET_ANIMALS_WITH_PICS", payload: animalsWithPics})
      })
    }
  }

export function fetchAnimal(id) {
  return function(dispatch) {
    firebaseRef.ref('/HipD/' + id)
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