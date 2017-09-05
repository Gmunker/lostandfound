module.exports = {
	filterAnimals(animals, showDog, showCat, showLost, showFound, searchText) {
		let filteredAnimals = animals;
		
		filteredAnimals = animals.filter(animal => {
			return ((showDog === (animal.type === "dog")) && 
					(showCat === (animal.type === "cat")) && 
					(showLost === (animal.history[0].status === "lost")) && 
					(showFound === (animal.history[0].status === "found"))
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

		return filteredAnimals;
	}
};