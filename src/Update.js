import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import scriptLoader from 'react-async-script-loader';
import { fetchAnimal } from './actions/animalsActions';
import { animalInfo } from './actions/animalActions';
import { updateAnimal, deleteAnimal } from './actions/firebaseActions';
import { connect } from 'react-redux';

var google
var map
var marker

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
	  
	componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
        if(google === undefined) {
            if (isScriptLoaded && isScriptLoadSucceed) {
                google = window.google
                map = new google.maps.Map(this.refs.map, {
                    zoom: 12,
                    gestureHandling: 'greedy',
                    disableDefaultUI: true,
                    fullscreenControl: true,
                    center: {
                        lat: 36.170295,
                        lng: -86.674846
                    }
				})
				// Add all previous markers
				console.log(this.Animal)
				// marker = new google.maps.Map({

				// })
                map.addListener('click', function(e) {                    
                    this.placeMarkerAndPanTo(e.latLng, map);
                }.bind(this));
            }
        }
	}
	
	componentWillUnmount() {
		this.props.dispatch(animalInfo({history: [{status: "lost"}], type: "dog"}))
        google = undefined
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

	placeMarkerAndPanTo(latLng, map) {
		// Make sure it only writes to the same position appended to the end of history
	}

	render() {

	let Animal = this.props.Animal;
	return(
		<div className="addContent content">
			<Navigation navSwitch={this.props.navSwitch} ActivePage="Detail"/>
			<div className="topContainer">
				<h2 className="pageHeader">Update Animal</h2>
				<form>
					<div className="formRow">
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
					<div ref="map" id="map" style={{height: "250px", width:"100%"}}></div>
					<div className="formRow">
						<label htmlFor="sex">Sex</label>
						<select 
							name="sex" 
							id="sex" 
							ref="gender" 
							onChange={this.handleChange} 
							value={Animal.Gender}
						>
							<option value={"male"}>Male</option>
							<option value={"female"}>Female</option>
							<option value={"neutered male"}>Neutered Male</option>
							<option value={"spayed female"}>Spayed Female</option>
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

					<div className="formTwoColumn">
						<div className="formSpanOne radio">
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
						<div className="formSpanOne radio">
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

const LoadConnector = connect(state => {
	return {
		Animal: state.animal
	}
})(Update);

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector)