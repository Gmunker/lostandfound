export function animalInfo(animalInfo) {
	return {
		type: "SET_ANIMAL_INFO",
		payload: animalInfo
	}
}

export function currentAnimal(animal) {
	return {
		type: "SET_CURRENT_ANIMAL",
		payload: animal
	}
}

export function currentHistory(currentHistory) {
	return {
		type: "SET_CURRENT_HISTORY",
		payload: currentHistory
	}
}

export function setNewHistory(newHistory) {
	return {
		type: "SET_NEW_HISTORY",
		payload: newHistory
	}
}