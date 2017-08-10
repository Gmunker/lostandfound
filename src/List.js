import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Search from './Search';
import { connect } from 'react-redux';
import { fetchAnimals } from './actions/animalsActions';
import searchAPI from'./api/searchApi';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "dog",
			searchField: "",
			status: "lost"
		}
	}

	componentWillMount() {
		this.props.dispatch(fetchAnimals());
	}
	
   	render() {		

		let { searchText, showDog, showCat, showLost, showFound } = this.props.searchFields;
		{console.log(this.props.animals)}
		let filteredAnimals = searchAPI.filterAnimals(this.props.animals, showDog, showCat, showLost, showFound, searchText);
			
		let table = filteredAnimals.map((Animal) => {
			let loc = Animal.Type === "dog" ? "/dog/details?id" + Animal.Id : "/cat/details?id=" + Animal.Id;
			return(
				<tr key={Animal.Id}>
					<td className="loctd">
						<Link id={Animal.Id} to={loc}>{Animal.Location}</Link>
					</td>
					<td className="colortd"><Link to={loc}>{Animal.Color}</Link></td>
					<td className="breedtd"><Link to={loc}>{Animal.Breed}</Link></td>
				</tr>
			)
		});

		return(
			<div className="listContent content">
				<Navigation navSwitch={this.props.navSwitch} ActivePage="List"/>
				<div className="topContainer">
					<h2 className="pageHeader">I'm looking for a...</h2>
					<Search />
					<table>
						<thead>
							<tr>
								<th>Location</th>
								<th>Color</th>
								<th>Breed</th>
							</tr>
						</thead>
						<tbody>
							{this.props.animals.length > 0 ? table : null}
						</tbody>
					</table>
					{this.props.animals.length === 0 ? <h1>Loading List....</h1> : null}
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