import firebase from '../firebase';
let firebaseRef = firebase.database().ref("HipD");

export function addAnimal(animal) {
  firebaseRef.push(animal);
}

export function deleteAnimal(id) {
    return function() {
      return firebaseRef.child(id).remove()
    }
  }

export function updateAnimal(id, animal) {
  return firebaseRef.child(id).update(animal)
}