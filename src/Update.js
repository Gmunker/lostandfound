import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
// import dateFormat from 'dateformat';

import { fetchAnimal } from './actions/animalsActions';
import { animalInfo } from './actions/animalActions';
import { updateAnimal, deleteAnimal } from './actions/firebaseActions';
import { connect } from 'react-redux';

class Update extends Component {
	constructor(props) {
	super(props);
	this.handleChange = this.handleChange.bind(this);
	this.handleStatus = this.handleStatus.bind(this);
}

	componentWillMount() {
   let searchParams = this.props.location.search;
		let id = searchParams.slice(searchParams.indexOf('?id=') + 4);
			// let animalID = this.props.match.params.Id;
			this.props.dispatch(fetchAnimal(id));
  }

	handleChange(event) {	
		let ref = this.refs;
		this.props.dispatch(animalInfo({
				...this.props.Animal,
				Name: ref.name.value,
				Location: ref.location.value,
				Color: ref.color.value,
				Breed: ref.breed.value,
				Date: new Date().toString()
		}))
	}

	handleStatus(e) {
		let Status = e.currentTarget.name === "status" ? e.currentTarget.value : null;
		this.props.dispatch(animalInfo({
			...this.props.Animal,
			Status
		}))
	}

	componentWillUnmount() {
		this.props.dispatch(animalInfo({}));
	}

	render() {

	let Animal = this.props.Animal;
		console.log(Animal)
	return(
		<div className="addContent content">
			<Navigation navSwitch={this.props.navSwitch} ActivePage="Detail"/>
			<div className="topContainer">
				<h2 className="pageHeader">Update Animal</h2>
				<form>
					<div>
						<label htmlFor="name">Name</label>
						<input 
							name="name" 
							id="name" 
							ref="name" 
							type="text" 
							onChange={this.handleChange} 
							value={Animal.Name}
						/>
					</div>
					<div>
						<label htmlFor="location">Location*</label>
						<input 
							name="location" 
							id="location" 
							ref="location" 
							type="text" 
							onChange={this.handleChange} 
							value={Animal.Location} 
							required
						/>
					</div>
					<div>
						<label htmlFor="sex">Sex</label>
						<select 
							name="sex" 
							id="sex" 
							ref="gender" 
							onChange={this.handleChange} 
							value={Animal.Gender}
						>
							<option value={"m"}>Male</option>
							<option value={"f"}>Female</option>
						</select>
					</div>
					<div className="formRow">
						<div className="formSpanOne">
							<label htmlFor="color">Color*</label>
							<input 
								name="color" 
								id="color" 
								ref="color" 
								type="text" 
								onChange={this.handleChange} 
								value={Animal.Color} 
								required
							/>
						</div>
						<div className="formSpanOne">
							<label htmlFor="breed">Breed</label>
							<input 
								name="breed" 
								id="breed" 
								ref="breed" 
								type="text" 
								onChange={this.handleChange} 
								value={Animal.Breed}
							/>
						</div>
					</div>
					<div className="formRow">
						<div className="radio">
							<span>Lost</span>
							<input 
								type="radio" 
								id="statusLost" 
								name="status" 
								onChange={this.handleStatus} 
								value="lost" 
								checked={Animal.Status==="lost"}
							/>
							<label htmlFor="statusLost"></label>
						</div>
						<div className="radio">
							<span>Found</span>
							<input 
								
							type="radio" 
								id="statusFound" 
								name="status" 
								onChange={this.handleStatus} 
								value="found" 
								checked={Animal.Status==="found"}
							/>
							<label htmlFor="statusFound"></label>
						</div>
					</div>
					<Link
						to="/list"
						className="formButton" 
						onClick={ () => this.props.dispatch(updateAnimal(Animal.Id, Animal))} 
					>Update</Link>
					<Link
						to="/list"
						className="formButton" 
						onClick={() => this.props.dispatch(deleteAnimal(Animal.Id))}
					>Delete</Link>
					<span className="formIndicia">* Required Field</span>
				</form>
			</div>
		</div>
	)}
}

export default connect(state => {
	return {
		Animal: state.animal
	}
})(Update);