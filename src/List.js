import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

import { connect } from 'react-redux';
import { fetchAnimals, fetchAnimal } from './actions/animalsActions';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "dog",
			status: "lost"
		}
		this.handleType = this.handleType.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
		this.handleClick = this.handleClick.bind(this);
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

	handleClick(e) {
		this.props.dispatch(fetchAnimal(this.refs.animal.props.id))
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
					<Filter />
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
	animals: state.animals.animals
}})(List);