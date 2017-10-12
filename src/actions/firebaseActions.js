import firebase from '../firebase';
let firebaseRef = firebase.database().ref("HipD");

export function addAnimal(animal, myFile) {

  let key = firebaseRef.push(animal).key;

  const storageRef = firebase.storage().ref(key + '/' + myFile.name);
  storageRef.put(myFile);
}

export function deleteAnimal(id) {
    return function() {
      return firebaseRef.child(id).remove()
    }
  }

export function updateAnimal(id, animal) {
  return firebaseRef.child(id).update(animal)
}