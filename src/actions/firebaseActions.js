import firebase from '../firebase';
let firebaseRef = firebase.database().ref("HipD");

export function addAnimal(animal, myFile) {

  let key = firebaseRef.push(animal).key;

  const storageRef = firebase.storage().ref(key + '/' + myFile.name);
  storageRef.put(myFile);
}

export function deleteAnimal(id) {
    return function() {
      let dataToDelete = {}
      dataToDelete["animals/" + id] = null
      dataToDelete["animalsWithPics/" + id] = null
      return (
        firebaseRef.update(dataToDelete)
      )
    }
  }

export function updateAnimal(id, animal) {
  return firebaseRef.child(id).update(animal)
}