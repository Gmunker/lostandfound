import firebase from '../firebase';
let firebaseRef = firebase.database().ref("HipD");
const firebaseFunc = firebase.database();

export function addAnimal(animal, myFile) {

  let key = firebaseRef.push(animal).key;

  const storageRef = firebase.storage().ref(key + '/' + myFile.name);
  storageRef.put(myFile);
}

export function deleteAnimal(id) {
  return new Promise(function (resolve, reject) {
    firebaseFunc.ref('HipD/animalsMaster/' + id).on('value', (snapshot) => {
      let currentStatus = snapshot.val() || {};

      let dataToDelete = {}
      dataToDelete[currentStatus + "/" + id] = null
      dataToDelete["animalsMaster" + "/" + id] = null
      dataToDelete["animalsWithPics/" + id] = null
      return (
        firebaseRef.update(dataToDelete)
      )
      resolve()
    })
  })
}

export function updateAnimal(id, animal) {
  return firebaseRef.child(id).update(animal)
}