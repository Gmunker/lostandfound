module.exports = {
	filterAnimals(animals, showDog, showCat, showLost, showFound, searchText) {
		let filteredAnimals = animals;
		
		filteredAnimals = animals.filter(animal => {
			return ((showDog === (animal.type === "dog")) && 
					(showCat === (animal.type === "cat")) && 
					(showLost === (animal.history[animal.history.length - 1].status === "lost")) && 
					(showFound === (animal.history[animal.history.length - 1].status === "found"))
				);
			})
		
		//Filter by searchText
		filteredAnimals = filteredAnimals.filter((animal) => {
			let name = animal.name.toLowerCase();
			// let loc = animal.Location.toLowerCase();
			let breed = animal.breed.toLowerCase();
			let color = animal.color.toLowerCase();

			return (searchText.length === 0 || 
				(name.indexOf(searchText.toLowerCase()) > -1) ||
				// (loc.indexOf(searchText.toLowerCase()) > -1) ||
				(breed.indexOf(searchText.toLowerCase()) > -1) ||
				(color.indexOf(searchText.toLowerCase()) > -1)
			);
		})

		//Sort todos with non-completed first
		// filteredAnimals.sort((a, b) => {
		// 	if (!a.completed && b.completed) {
		// 		return -1;
		// 	} else if (a.completed && !b.completed) {
		// 		return 1;
		// 	} else {
		// 		return 0;
		// 	}
		// });

		return filteredAnimals;
	}
};