module.exports = {
	filterAnimals(animals, showDog, showCat, showLost, showFound, searchText) {
		// console.log(animals)
		let filteredAnimals = animals;
		
		filteredAnimals = animals.filter(animal => {
			let last = animal.history.length - 1
			return ((showDog === (animal.type === "dog")) && 
					(showCat === (animal.type === "cat")) && 
					(showLost === (animal.history[last].status === "lost")) && 
					(showFound === (animal.history[last].status === "found"))
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