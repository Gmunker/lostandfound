import firebase from '../firebase';
const firebaseRef = firebase.database();

export function fetchAnimals() {
  return function(dispatch) {
     firebaseRef.ref('HipD')
      .on('value', (snapshot) => {
        let animals = snapshot.val() || {};
        let parsedAnimals = [];
        let parsedHistory = [];
        Object.keys(animals).forEach((animalId) => {
          let history = animals[animalId].history
          Object.keys(history).forEach((historyId) => {
            parsedHistory.push({
              ...history[historyId],
              date: new Date(Number(historyId)).toString()
            })
          })
          parsedHistory.sort((a,b) => new Date(a.date) - new Date(b.date))

          parsedAnimals.push({
            ...animals[animalId],
            id: animalId,
            history: parsedHistory
          });
        });
        let animalsWithPics = parsedAnimals.filter(animal => animal.Image)
        dispatch({type: "FETCH_ANIMALS_FULLFILLED",payload: parsedAnimals}) 
        dispatch({type: "SET_ANIMALS_WITH_PICS", payload: animalsWithPics})
      })
    }
  }

export function fetchAnimal(id) {
  return function(dispatch) {
    firebaseRef.ref('/HipD/' + id)
    .on('value', (snapshot) => {
      
      let history = snapshot.val().history;
      let parsedHistory = [];

      Object.values(history).forEach((historyId) => {
        parsedHistory.push({
          ...historyId
          // ...history[historyId],
          // date: new Date(Number(historyId)).toString()
        })
      })

      // parsedHistory.map(history => {
      //   if (history.length) {
      //     delete history.length
      //   }
      // })
      
      parsedHistory.sort((a,b) => new Date(a.date) - new Date(b.date))

      let animal = {
        ...snapshot.val(),
        id: id,
        history: parsedHistory
      } || {};

      console.log(snapshot.val())
      console.log(parsedHistory)
      
      dispatch({type: "SET_ANIMAL_INFO", payload: animal})
      dispatch({type: "SET_CURRENT_ANIMAL", payload: animal})
      dispatch({type: "SET_CURRENT_HISTORY", payload: snapshot.val().history})
      dispatch({type: "SET_NEW_HISTORY", payload: animal.history[animal.history.length - 1]})
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