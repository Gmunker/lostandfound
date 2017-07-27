module.exports = {
	filterAnimals(animals, showDogs, showCats, showLost, showFound, searchText) {
		let filteredAnimals = animals;

		//Filter by showCompleted
		filteredAnimals = filteredAnimals.filter((animal) => {
			return !animal.completed || showCompleted;
		});

		//Filter by searchText
		filteredAnimals = filteredAnimals.filter((animal) => {
			let text = animal.text.toLowerCase();
			return searchText.length === 0 || text.indexOf(searchText.toLowerCase()) > -1;
		})

		//Sort todos with non-completed first
		filteredAnimals.sort((a, b) => {
			if (!a.completed && b.completed) {
				return -1;
			} else if (a.completed && !b.completed) {
				return 1;
			} else {
				return 0;
			}
		});

		return filteredTodos;
	}
};