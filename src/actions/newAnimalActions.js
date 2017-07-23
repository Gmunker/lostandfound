export function newAnimalInfo(newAnimalInfo) {
  return {
    type: "SET_NEW_ANIMAL_INFO",
    payload: newAnimalInfo
  }
}

export function newAnimalStatus(newAnimalStatus) {
  return {
    type: "SET_NEW_ANIMAL_STATUS",
    payload: newAnimalStatus
  }
}

export function newAnimalType(newAnimalType) {
  return {
    type: "SET_NEW_ANIMAL_TYPE",
    payload: newAnimalType
  }
}