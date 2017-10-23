import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Search from './Search';
import { connect } from 'react-redux';
import { currentAnimal } from './actions/animalActions';
import { newfetchAnimals } from './actions/animalsActions';
import searchAPI from'./api/searchApi';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// type: this.props.searchFields.showDog ? "dog" : "cat",
			// status: this.props.searchFields.showLost ? "lost" : "found",
			searchField: ""
		}
		// this.fetchNewNodeFromStatus = this.fetchNewNodeFromStatus.bind(this)
		// this.fetchNewNodeFromType = this.fetchNewNodeFromType.bind(this)
	}

	componentWillMount() {
		this.props.dispatch(newfetchAnimals())
	}

	componentWillUpdate(nextProps, nextState) {
		const type = nextProps.searchFields.showDog ? "dog" : "cat"
		const status = nextProps.searchFields.showLost ? "lost" : "found"

		nextProps.searchFields !== this.props.searchFields && this.props.dispatch(newfetchAnimals(type, status))
	}

	// fetchNewNodeFromType(event) {
	// 		this.setState({
	// 	type: event.target.value
	// 	}, () => {
	// 	this.props.dispatch(newfetchAnimals(this.state.type, this.state.status));
	// 	})
	// }
	
	// fetchNewNodeFromStatus(event) {
	// 	this.setState({
	// 	status: event.target.value
	// 	}, () => {
	// 	this.props.dispatch(newfetchAnimals(this.state.type, this.state.status))
	// 	})
	// }

	componentWillUnmount() {
        this.props.dispatch(currentAnimal({history: [{status: "lost"}], type: "dog"}))
	}
	
	
	
   	render() {
		// let Props = {
		// 	formMethods: {
		// 		fetchNewNodeFromType: this.fetchNewNodeFromType,
		// 		fetchNewNodeFromStatus: this.fetchNewNodeFromStatus
		// 	},
		// 	nodeSelection: {
		// 		status: this.state.status,
		// 		type: this.state.type
		// 	}
		// }

		let { searchText, showDog, showCat, showLost, showFound } = this.props.searchFields;
		let filteredAnimals = searchAPI.filterAnimals(this.props.animals, showDog, showCat, showLost, showFound, searchText);
		let table = filteredAnimals.map((animal) => {
			
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
			</div>
		)
  }
}

export default connect(state => {
	return {
	animals: state.animals.animals,
	searchFields: state.searchFields
}})(List);

// {this.props.animals.length === 0 ? <h1>Loading List....</h1> : null}