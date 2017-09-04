import firebase from '../firebase';
const firebaseRef = firebase.database();

export function fetchAnimals() {
  	return function(dispatch) {
		firebaseRef.ref('HipD').on('value', (snapshot) => {
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
		firebaseRef.ref('/HipD/' + id).on('value', (snapshot) => {
<<<<<<< HEAD
			let history = snapshot.val().history;

			let orderedHistory = {}
			Object.keys(history).sort().forEach(function(key) {
				orderedHistory[key] = history[key]
			})

			let parsedHistory = [];
			let keys = Object.keys(orderedHistory);
			let values = Object.values(orderedHistory)
			for (var i=0;i<values.length;i++) {
				var utcSeconds = keys[i];
				var date = new Date(0);
				date.setUTCMilliseconds(utcSeconds);
=======
			
			let parsedHistory = [];
			let history = snapshot.val().history
			Object.keys(history).forEach(historyID => {
>>>>>>> da0298ddaa6b5e924060b6f21bc26928ee0d7b7d
				parsedHistory.push({
					...history[historyID],
					date: new Date().setTime(historyID)
				})
			})
			parsedHistory.sort((a,b) => new Date(b.date) - new Date(a.date))

			let animal = {
				...snapshot.val(),
				id: id,
				history: parsedHistory.reverse()
			} || {};

			dispatch({type: "SET_CURRENT_ANIMAL", payload: animal})
		})
  }
}