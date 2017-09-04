import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import scriptLoader from 'react-async-script-loader';
import { fetchAnimal } from './actions/animalsActions';
import { animalInfo, currentAnimal, currentHistory, setNewHistory } from './actions/animalActions';
import { updateAnimal, deleteAnimal } from './actions/firebaseActions';
import { connect } from 'react-redux';
import regions from './GoogleMap/geojson.json';

var google
var map
var marker
var counter = 0

class Update extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newAnimal: null
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSex = this.handleSex.bind(this);
		this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this);
		this.findRegion = this.findRegion.bind(this);
	}
	
	// Lifecycle Methods
	componentWillMount() {
		let animalID = this.props.match.params.id
		this.props.dispatch(fetchAnimal(animalID))
	}

	shouldComponentUpdate(nextProps, nextState) {
        if ((nextProps.isScriptLoaded && nextProps.isScriptLoadSucceed) || (this.props.isScriptLoaded && this.props.isScriptLoadSucceed)) {
            if (nextProps.currentAnimal.history || this.props.currentAnimal.history) {
                return true
            } else {
                return false
            }
        }
	}
	
	componentWillReceiveProps(nextProps, nextState) {
		console.log(this.props.currentAnimal)
		console.log(nextProps.currentAnimal)
		if (nextProps.currentAnimal !== this.props.currentAnimal) {
			console.log(this.props.newAnimal)
			console.log(nextProps.currentAnimal)
			var currentAnimal = nextProps.currentAnimal.history[0]
			nextProps.currentAnimal.history.unshift(currentAnimal)
			// console.log(this.state.newAnimal)
			if(this.state.newAnimal === null) {
				this.setState({
					newAnimal: nextProps.currentAnimal
				})
			}
		}
	}

	componentDidUpdate (nextProps, nextState) {
		console.log(this.state)
		var currentAnimal = this.props.currentAnimal;
		google = window.google;

		// Pull in defaults from props. Push a new history with the last instance of historys data. Overwrite the last history and animal data	

		map = new google.maps.Map(this.refs.map, {
			zoom: 14,
			gestureHandling: 'greedy',
			disableDefaultUI: true,
			fullscreenControl: true,
			center: {
				lat: currentAnimal.history[0].lat,
				lng: currentAnimal.history[0].lng
			}
		})

		let arrLength = currentAnimal.history.length;

		currentAnimal.history.map((event, index) => {
			if (index > 0) {
				var customMarker = {
					url: require(`./images/mapIcons/${currentAnimal.history[index].status}${currentAnimal.type}IconLabel.png`),
					size: new google.maps.Size(53, 40),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(21, 41),
					labelOrigin: new google.maps.Point(40, 16)
				}
				var markerLabel = (arrLength - 1).toString()
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
			}
		})
		
		map.addListener('click', function(e) {
			// this.findRegion(e.latLng, google)
			this.placeMarkerAndPanTo(e.latLng, map, google, currentAnimal)
		}.bind(this))
	}

	componentWillUnmount() {
		this.props.dispatch(currentAnimal({type: "dog"}))
		google = undefined
	}
	
	// Form Methods
	handleChange(event) {   
		event.preventDefault();
		let ref = this.refs;
		this.props.dispatch(currentAnimal({
			...this.props.currentAnimal,
			name: ref.name.value,
			color: ref.color.value,
			breed: ref.breed.value
		}))
	}

	handleStatus(e) {
		let status = e.currentTarget.name === "status" ? e.currentTarget.value : null;
		this.props.dispatch(setNewHistory({ ...this.props.newHistory, status }))
	}

	handleSex(e) {
		let sex = e.target.value;
		this.props.dispatch(setNewHistory({ ...this.props.newHistory, sex }))
	}	

	handleSubmit(e) {
		e.preventDefault();
		let date = new Date().getTime();

		let pushNewHistoryToCurrent = new Promise((resolve, reject) => {
			let history = this.props.currentHistory
			history[date] = this.props.newHistory	
			this.props.dispatch(currentHistory(history))
			this.props.currentHistory[date] ? resolve() : reject();
		})

		let mergeNewHistoryToAnimal = new Promise((resolve, reject) => {
			this.props.dispatch(currentAnimal({
				...this.props.currentAnimal,
				history: this.props.currentHistory
			}))
			this.props.currentAnimal.history[date] ? resolve() : reject()
		})
		
		pushNewHistoryToCurrent.then(() => {
			// console.log("Pushed New History to Current History Obj")
			mergeNewHistoryToAnimal.then(() => {
				// this.props.dispatch(updateAnimal(this.props.currentAnimal.id, this.props.currentAnimal))										
			}).catch(e => e)
		}).catch((e) => e)
	}

	// Map Methods
	placeMarkerAndPanTo(latLng, map, google, currentAnimal) {
		currentAnimal.history[0].region = "Frank"
		// const newHistory = this.state.currentAnimal.history
		// this.state.currentAnimal.history[0].lat = latLng.lat()
		this.setState({
			newAnimal: currentAnimal
		}, () => { console.log(this.state.newAnimal) })
		// marker = new google.maps.Marker({
		// 	position: latLng,
		// 	map,
		// 	icon: require(`./images/mapIcons/${this.props.newHistory.status}${this.props.currentAnimal.type}IconLabel.png`)
		// });
		// map.panTo(latLng);
	}

	findRegion(latLng, google) {
		let regionName;
		for(let i=0; i<regions.length;i++) {
			let currentPoly = new google.maps.Polygon({paths: regions[i].polygon});
			if(google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
				regionName = regions[i].name;
			}
		}
		
		let region = regionName !== undefined ? regionName : "Outside Defined Regions"
		return region
		// this.props.dispatch(setNewHistory({
		// 	...this.props.newHistory,
		// 	lat: latLng.lat(),
		// 	lng: latLng.lng(),
		// 	region: region
		// }))
	}
		
	render() {
		let animal = this.props.currentAnimal
		if(!animal.history) {
			return(
				<div>Loading...</div>
			)
		} else {
			return(
				<div className="addContent content">
					<Navigation />
					<div className="topContainer">
						<h2 className="pageHeader">Update Animal</h2>
						<form>
							<div className="formTwoColumn">
								<div className="formSpanOne radio">
									<span>Lost</span>
									<input 
										type="radio" 
										id="statusLost" 
										name="status" 
										onChange={this.handleStatus} 
										value="lost" 
										checked={animal.status === "lost"}
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
										checked={animal.status === "found"}
									/>
									<label htmlFor="statusFound"></label>
								</div>
							</div>
						
							<div ref="map" id="map" style={{height: "250px", width:"100%"}}></div>
			
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
							<div className="formRow">
								<label htmlFor="sex">Sex</label>
								<select 
									name="sex" 
									id="sex" 
									ref="gender" 
									onChange={this.handleSex} 
									value={animal.sex}
								>
									<option value={"male"}>Male</option>
									<option value={"female"}>Female</option>
									<option value={"neutered male"}>Neutered Male</option>
									<option value={"spayed female"}>Spayed Female</option>
								</select>
							</div>
							<div className="formTwoColumn">
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
							<Link
								to="/list"
								className="formButton" 
								onClick={this.handleSubmit} 
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
			)
		}
	}
}


const LoadConnector = connect(state => {
    return {
				// animal: state.animal.animal,
				currentAnimal: state.animal.currentAnimal,
				// currentHistory: state.animal.currentHistory,
				// newHistory: state.animal.newHistory
    }
})(Update);
export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector) 