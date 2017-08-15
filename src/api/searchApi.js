module.exports = {
	filterAnimals(animals, showDog, showCat, showLost, showFound, searchText) {
		let filteredAnimals = animals;
		
		filteredAnimals = animals.filter(animal => {
			return ((showDog === (animal.Type === "dog")) && 
					(showCat === (animal.Type === "cat")) && 
					(showLost === (animal.Status === "lost")) && 
					(showFound === (animal.Status === "found"))
				);
			})
		
		//Filter by searchText
		filteredAnimals = filteredAnimals.filter((animal) => {
			let name = animal.Name.toLowerCase();
			// let loc = animal.Location.toLowerCase();
			let breed = animal.Breed.toLowerCase();
			let color = animal.Color.toLowerCase();

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