import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

import { connect } from 'react-redux';
import { fetchAnimals } from './actions/animalsActions';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "dog",
			status: "lost"
		}
		this.handleType = this.handleType.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
	}

	componentWillMount() {
		this.props.dispatch(fetchAnimals());
	}

	handleType(e) {
		let type = e.currentTarget.name === "type" ? e.currentTarget.value : null
		this.setState((state, props) => { 
			return { 
				...this.state, 
				type 
			}});
	}

	handleStatus(e) {
			let status = e.currentTarget.name === "status" ? e.currentTarget.value : null
		this.setState((state, props) => { 
			return { 
				...this.state,
				status 
			}});
	}
	
   	render() {
			const Filter = () => {
				return (
					<div className="filter">
						<div className="formRow">
							<div className="radio">
								<span>Lost</span>
								<input 
									type="radio" 
									id="statusLost" 
									name="status"  
									value="lost" 
									onChange={this.handleStatus}
									checked={this.state.status === "lost"}
								/>
								<label htmlFor="statusLost"></label>
							</div>
							<div className="radio">
								<span>Found</span>
								<input 
									type="radio" 
									id="statusFound" 
									name="status"   
									value="found"
									onChange={this.handleStatus}
									checked={this.state.status === "found"}
								/>
								<label htmlFor="statusFound"></label>
							</div>
						</div>
						<div className="formRow">
							<div className="radio">
								<span>Dog</span>
								<input 
									type="radio" 
									id="typeDog" 
									name="type" 
									value="dog" 
									onChange={this.handleType}
									checked={this.state.type === "dog"}
								/>
								<label htmlFor="typeDog"></label>
							</div>
							<div className="radio">
								<span>Cat</span>
								<input 
									type="radio" 
									id="typeCat" 
									name="type" 
									value="cat" 
									onChange={this.handleType}
									checked={this.state.type === "cat"}
								/>
								<label htmlFor="typeCat"></label>
							</div>
							</div>
					</div>
				)
			}
			
			let filteredAnimals = this.props.animals.filter((animal) => {
				return ((this.state.type === animal.Type) && (this.state.status === animal.Status));
			})
			
			let table = filteredAnimals.map((Animal) => {
				return(
					<tr key={Animal.id} onClick={() => {this.props.getDetails(Animal)}}>
						<td className="loctd"><Link to="/detail">{Animal.Location}</Link></td>
						<td className="colortd"><Link to="/detail">{Animal.Color}</Link></td>
						<td className="breedtd"><Link to="/detail">{Animal.Breed}</Link></td>
					</tr>
				)
			});


		return(
			<div className="listContent content">
				<Navigation navSwitch={this.props.navSwitch} ActivePage="List"/>
				<div className="topContainer">
					<h2 className="pageHeader">I'm looking for a...</h2>
					<Filter handleChange={this.handleChange} status={this.state.status} type={this.state.type}/>
					<table>
						<thead>
							<tr>
								<th>Location</th>
								<th>Color</th>
								<th>Breed</th>
							</tr>
						</thead>
						<tbody>
							{this.props.animals.length > 0 ? table : <h1>Loading....</h1>}
						</tbody>
					</table>
				</div>
			</div>
		)
  }
}

export default connect(state => {return {
	animals: state.animals.animals
}})(List);