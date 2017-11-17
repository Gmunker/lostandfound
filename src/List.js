import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Search from './Search';
import { connect } from 'react-redux';
import { currentAnimal } from './actions/animalActions';
import { newfetchAnimals } from './actions/animalsActions';
import searchAPI from'./api/searchApi';
import Footer from './Footer';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "dog",
			status: "lost",
			searchField: ""
		}
	}

	componentWillMount(nextProps, nextState) {
		this.props.dispatch(newfetchAnimals());
	}	

	componentWillUpdate(nextProps, nextState) {
		const type = nextProps.searchFields.showDog ? "dog" : "cat"
		const status = nextProps.searchFields.showLost ? "lost" : "found"
		
		nextProps.searchFields !== this.props.searchFields && this.props.dispatch(newfetchAnimals(type, status));
	}

	componentWillUnmount() {
		// this.props.searchFields.showDog = true
		// this.props.searchFields.showLost = true
	}
	
   	render() {

		let { searchText, showDog, showCat, showLost, showFound } = this.props.searchFields;
		let filteredAnimals = searchAPI.filterAnimals(this.props.animals, showDog, showCat, showLost, showFound, searchText);
		let table = filteredAnimals.reverse().map((animal) => {
			
			let loc = animal.type === "dog" ? `/dog/details/${animal.id}` : `/cat/details/${animal.id}`;
			return(
				<tr key={animal.id}>
					<td className="nametd"><Link id={animal.id} to={loc}>{animal.name}</Link></td>
					<td className="colortd"><Link to={loc}>{animal.color}</Link></td>
					<td className="breedtd"><Link to={loc}>{animal.breed}</Link></td>
				</tr>
			)
		});

		return(
			<div className="listContent content">
				<Navigation/>
				<div className="topContainer">
					<h2 className="pageHeader">I'm looking for a...</h2>
					<Search/>
					{this.props.animals.length > 0 ?
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Color</th>
								<th>Breed</th>
							</tr>
						</thead>
						<tbody>
							{this.props.animals.length > 0 ? table : null}
						</tbody>
					</table> :
					<p className="listEmptySet">No Results</p>
					}
				</div>
				<Footer/>
			</div>
		)
  }
}

export default connect(state => {
	return {
	animals: state.animals.animals,
	searchFields: state.searchFields
}})(List);