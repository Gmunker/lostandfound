export function animalInfo(animalInfo) {
  return {
    type: "SET_ANIMAL_INFO",
    payload: animalInfo
  }
}

export function currentAnimal(animal) {
  return {
    type: "SET_ANIMAL_INFO",
    payload: animal
  }
}

export function setNewHistory(newHistory) {
  return {
    type: "SET_NEW_HISTORY",
    payload: newHistory
  }
}