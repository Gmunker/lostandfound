import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Filter = (props) => {
	return (
		<div className="filter">
			<div className="formRow">
				<div className="radio">
					<span>Lost</span>
					<input type="radio" id="statusLost" name="status"  value="lost" onChange={props.handleChange} checked={props.status==="lost"}  />
					<label htmlFor="statusLost"></label>
				</div>
				<div className="radio">
					<span>Found</span>
					<input type="radio" id="statusFound" name="status" onChange={props.handleChange}  value="found" checked={props.status==="found"}/>
					<label htmlFor="statusFound"></label>
				</div>
			</div>
			<div className="formRow">
				<div className="radio">
					<span>Dog</span>
					<input type="radio" id="typeDog" name="type" value="dog" onChange={props.handleChange}   checked={props.type==="dog" }/>
					<label htmlFor="typeDog"></label>
				</div>
				<div className="radio">
					<span>Cat</span>
					<input type="radio" id="typeCat" name="type" value="cat" onChange={props.handleChange}   checked={props.type==="cat"}/>
					<label htmlFor="typeCat"></label>
				</div>
		    </div>
		</div>
	)
}

class DogTable extends Component {

	render() {

		return (
			<table>
				<thead>
					<tr>
						<th>Location</th>
						<th>Color</th>
						<th>Breed</th>
					</tr>
				</thead>
				<tbody>
					{	this.props.Animals.map((Animal) => {
						return(
						<tr key={Animal.key} onClick={() => {this.props.getDetails(Animal)}}>
							<td className="loctd"><Link to="/detail">{Animal.Location}</Link></td>
							<td className="colortd"><Link to="/detail">{Animal.Color}</Link></td>
							<td className="breedtd"><Link to="/detail">{Animal.Breed}</Link></td>
						</tr>
						)
					})}
				</tbody>
			</table>
		)
	}
}

class List extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			type: "dog",
			status: "lost"
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
	    if (event.target.name === "status") {
			this.setState({status: event.target.value}, () => {
				this.props.listFilter(this.state.type, this.state.status);
			})
		} else if (event.target.name === "type") {
			this.setState({type: event.target.value}, () => {
				this.props.listFilter(this.state.type, this.state.status);
			})
		}
	}
	
   	render() {
		return(
			<div className="listContent content">
				<Navigation navSwitch={this.props.navSwitch} ActivePage="List"/>
				<div className="topContainer">
					<h2 className="pageHeader">I'm looking for a...</h2>
					<Filter handleChange={this.handleChange} status={this.state.status} type={this.state.type}/>
					<DogTable Animals={this.props.Animals} getDetails={this.props.getDetails}/>
				</div>
			</div>
		)
   }
}

export default List;
