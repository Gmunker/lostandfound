import React, { Component } from 'react';

const Filter = (props) => {
	return (
		<div>
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
							<tr key={Animal.key}>
								<td className="loctd">{Animal.Location}</td>
								<td className="colortd">{Animal.Color}</td>
								<td className="breedtd">{Animal.Breed}</td>
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

	// listFilter(type="dog", status="lost") {
	// 	filteredArray = this.props.Animals.filter((Animal) => {
	// 		return ((Animal.Type === type) && (Animal.Status === status));
	// 	})
	// 	this.setState({
	// 		filteredAnimals: filteredArray
	// 	})
	// }
	
   	render() {
		return(
			<div className="listContent">
				<Filter handleChange={this.handleChange} status={this.state.status} type={this.state.type}/>
				<DogTable Animals={this.props.Animals}/>
				<button onClick={this.props.switchPage} value="Add">Add New Animal</button>
			</div>
		)
   }
}

export default List;
