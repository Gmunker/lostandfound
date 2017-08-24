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
	this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this)
}

	componentWillMount() {
   		let searchParams = this.props.location.search;
		let id = searchParams.slice(searchParams.indexOf('?id=') + 4);
		// let animalID = this.props.match.params.Id;
		this.props.dispatch(fetchAnimal(id));
	}
	  
	shouldComponentUpdate(nextProps) {
		return this.props.animal.history.length
	}

	componentWillUpdate (nextProps, nextState) {
		let { isScriptLoaded, isScriptLoadSucceed } = nextProps;
		var animal = nextProps.animal
		if (animal.history[0].lat !== null) {
			animal = nextProps.animal
			let animalHistory = animal.history.sort(function(a,b) {
				return new Date(b.date) - new Date(a.date)
			})
			if (isScriptLoaded && isScriptLoadSucceed) { // load finished
				google = window.google;
				map = new google.maps.Map(this.refs.map, {
					zoom: 14,
					gestureHandling: 'greedy',
					disableDefaultUI: true,
					fullscreenControl: true,
					center: {
							lat: animalHistory[0].lat,
							lng: animalHistory[0].lng
					}
				})
				let arrLength = animalHistory.length;
				animalHistory.map((event, index) => {
					var customMarker = {
						url: require(`./images/mapIcons/${animalHistory[index].status}${animal.type}IconLabel.png`),
						size: new google.maps.Size(53, 40),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(21, 41),
						labelOrigin: new google.maps.Point(40, 16)
					}
				
					var markerLabel = arrLength.toString()
					marker = new google.maps.Marker({
						position: {
							lat: event.lat,
							lng: event.lng
						},
						map,
						icon: customMarker,
						label: {
							text: markerLabel,
							fontWeight: "bold"
						}
					})
					arrLength -= 1
				})
				map.addListener('click', function(e) {
                    this.placeMarkerAndPanTo(e.latLng, map, animalHistory);
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
			...this.props.animal,
			name: ref.name.value,
			color: ref.color.value,
			breed: ref.breed.value,
			history: [{
				...this.props.animal.history,
				date: new Date().toString()
			}]
		}))
	} 

	handleStatus(e) {
		let status = e.currentTarget.name === "status" ? e.currentTarget.value : null;
		this.props.dispatch(animalInfo({
			...this.props.animal.history[0], // Need to set state instead
			status
		}))
	}

	placeMarkerAndPanTo(latLng, map, animalHistory) {
		// Make sure it only writes to the same position appended to the end of history
		let index = this.props.animal.history.length
		console.log(index)
		marker = new google.maps.Marker({
            position: latLng,
            map,
            icon: require(`./images/mapIcons/${animalHistory[0].status}${this.props.animal.type}IconLabel.png`)
        });
		map.panTo(latLng);
		this.setState({
			animalUpdate: {
				history: [{
					lat: latLng.lat(),
					lng: latLng.lng()
				}]
			}
		})
	}

componentWillUnmount() {
	this.props.dispatch(animalInfo({history: [{status: "lost"}], type: "dog"}))
	// google = undefined
}

	render() {

	let animal = this.props.animal;
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
							value={animal.name}
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
							value={animal.history[0].sex}
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

					<div className="formTwoColumn">
						<div className="formSpanOne radio">
							<span>Lost</span>
							<input 
								type="radio" 
								id="statusLost" 
								name="status" 
								onChange={this.handleStatus} 
								value="lost" 
								checked={animal.history[0].status==="lost"}
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
								checked={animal.history[0].status==="found"}
							/>
							<label htmlFor="statusFound"></label>
						</div>
					</div>
					
					<Link
						to="/list"
						className="formButton" 
						onClick={ () => this.props.dispatch(updateAnimal(animal.Id, animal))} 
					>Update</Link>
					<Link
						to="/list"
						className="formButton" 
						onClick={() => this.props.dispatch(deleteAnimal(animal.Id))}
					>Delete</Link>
					<span className="formIndicia">* Required Field</span>
				</form>
			</div>
		</div>
	)}
}

const LoadConnector = connect(state => {
	return {
		animal: state.animal
	}
})(Update);

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector)