import firebase from '../firebase';
let firebaseRef = firebase.database().ref("HipD");

export function addAnimal(animal) {
  firebaseRef.push(animal);
}

export function deleteAnimal(id) {
  firebaseRef.child(id).remove()
}

export function updateAnimal(id, animal) {
  firebaseRef.child(id).update(animal)
    .then(() => {
      console.log('Updated Successfully!')
    })
}