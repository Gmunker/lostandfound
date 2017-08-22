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
	this.state = {
		newHistory: {
			lat: null,
			lng: null,
			status: null,
			date: null
		}
	}
	this.handleChange = this.handleChange.bind(this);
	this.handleStatus = this.handleStatus.bind(this);
	this.handleSex = this.handleSex.bind(this);
}

	componentWillMount() {
   let searchParams = this.props.location.search;
		let id = searchParams.slice(searchParams.indexOf('?id=') + 4);
			// let animalID = this.props.match.params.Id;
			this.props.dispatch(fetchAnimal(id));
			this.setState((state, props) => { return { ...state, newHistory: {status: this.props.animal.history[(this.props.animal.history.length - 1)].status }}});
			
	}
	
	handleChange(e) {
		let ref = this.refs;
		this.props.dispatch(animalInfo({
				...this.props.animal,
				name: ref.name.value,
				color: ref.color.value,
				breed: ref.breed.value
		}))
	} 

	handleStatus(e) {
		let status = e.currentTarget.name === "status" ? e.currentTarget.value : null;
		
		this.setState((state, props) => { return { ...state, newHistory: {status} }});
		
	}

	handleSex(e) {
		let sex = e.currentTarget.name === "sex" ? e.currentTarget.value : null;
		this.props.dispatch(animalInfo({
				...this.props.newAnimal,
				sex
		}));
}

componentWillUnmount() {
	this.props.dispatch(animalInfo({history: [{status: "lost"}], type: "dog"}))
	// google = undefined
}

	render() {

	let animal = this.props.animal;
	let recentHistory = animal.history.length - 1;
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
							value={animal.name}
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
							value={animal.history[recentHistory].region} 
							required
						/>
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
								value={animal.color} 
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
								value={animal.breed}
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
								checked={this.state.newHistory.status === "lost"}
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
								checked={this.state.newHistory.status === "found"}
							/>
							<label htmlFor="statusFound"></label>
						</div>
					</div>
					<div className="formRow">
						<div className="radio">
								<span>Male</span>
								<input 
										type="radio"
										value="male"
										id="sexMale"
										name="sex"
										checked={animal.sex === "male"}
										onChange={this.handleSex}
								/>
								<label htmlFor="sexMale"></label>
						</div>
						<div className="radio">
								<span>Female</span>
								<input 
										type="radio"
										value="female"
										id="sexFemale"
										name="sex"
										checked={animal.sex === "female"}
										onChange={this.handleSex}
								/>
								<label htmlFor="sexFemale"></label>
						</div>
					</div>
					<Link
						to="/list"
						className="formButton" 
						onClick={ () => this.props.dispatch(updateAnimal(animal.id, animal))} 
					>Update</Link>
					<Link
						to="/list"
						className="formButton" 
						onClick={() => this.props.dispatch(deleteAnimal(animal.id))}
					>Delete</Link>
					<span className="formIndicia">* Required Field</span>
				</form>
			</div>
		</div>
	)}
}

export default connect(state => {
	return {
		animal: state.animal
	}
})(Update);