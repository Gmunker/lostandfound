import firebase from '../firebase';
const firebaseRef = firebase.database();

export function fetchAnimals() {
  	return function(dispatch) {

		firebaseRef.ref('HipD/animals').on('value', (snapshot) => {
			let animals = snapshot.val() || {};
			
			let parsedAnimals = [];
			Object.keys(animals).forEach((animalId) => {
				let parsedHistory = [];
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
			// let animalsWithPics = parsedAnimals.filter(animal => animal.image)
			dispatch({type: "FETCH_ANIMALS_FULLFILLED",payload: parsedAnimals}) 
			// dispatch({type: "SET_ANIMALS_WITH_PICS", payload: animalsWithPics})
		})
    }
}

export function newfetchAnimals(type = "dog", status = "lost") {

	return function(dispatch) {

	  firebaseRef.ref('HipD/' + type + status).on('value', (snapshot) => {
		  let animals = snapshot.val() || {};
		  let parsedAnimals = [];
		  Object.keys(animals).forEach((animalId) => {
			  let parsedHistory = [];
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
		//   console.log(parsedAnimals)
		  // let animalsWithPics = parsedAnimals.filter(animal => animal.image)
		  dispatch({type: "FETCH_ANIMALS_FULLFILLED",payload: parsedAnimals}) 
		  // dispatch({type: "SET_ANIMALS_WITH_PICS", payload: animalsWithPics})
	  })
  }
}

export function fetchAnimalsWithPics() {
	return function(dispatch) {
		firebaseRef.ref('HipD/animalsWithPics').limitToLast(4).on('value', (snapshot) => {
			let animalsWithPics = snapshot.val() || {};
			let keys = Object.keys(animalsWithPics)
			let values = Object.values(animalsWithPics)
			animalsWithPics = {keys: keys, values: values}
			dispatch({type: "SET_ANIMALS_WITH_PICS", payload: animalsWithPics})
		})
	}
}

export function fetchAnimal(id) {
  	return function(dispatch) {
		firebaseRef.ref('HipD/animalsMaster/' + id).once('value').then(function(snapshot) {
			let currentStatus = snapshot.val()
			firebaseRef.ref('/HipD/' + currentStatus + "/" + id).on('value', (snapshot) => {
				if (snapshot.val() === null) {
					return dispatch({type: "SET_CURRENT_ANIMAL", payload: {animalNotFound: true}})
				} else {
					let history = snapshot.val().history;
					let parsedHistory = [];
					let keys = Object.keys(history);
					let values = Object.values(history)

					values.map((event, i) => {
						let utcSeconds = keys[i]
						let date = new Date(0)
						date.setUTCMilliseconds(utcSeconds)
						parsedHistory.push({
							...event,
							date
						})
					})

					// parsedHistory.sort((a,b) => new Date(a.date) - new Date(b.date))
					let animal = {
						...snapshot.val(),
						id: id,
						history: parsedHistory.reverse()
					} || {};
	
					dispatch({type: "SET_CURRENT_ANIMAL", payload: animal})
				}
			})
		})
  	}
}
