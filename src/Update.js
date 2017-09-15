import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import scriptLoader from 'react-async-script-loader';
import { fetchAnimal } from './actions/animalsActions';
import { currentAnimal } from './actions/animalActions';
import { updateAnimal, deleteAnimal } from './actions/firebaseActions';
import { connect } from 'react-redux';
import regions from './GoogleMap/geojson.json';

let google
let map
let marker
let newMarker

class Update extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newHistory: null,
			redirect: false,
			animalFound: null
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSex = this.handleSex.bind(this);
		this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this);
		this.findRegion = this.findRegion.bind(this);
		this.replaceMarkerIcon = this.replaceMarkerIcon.bind(this);
		this.handleDelete = this.handleDelete.bind(this)
	}
	
	// Lifecycle Methods
	componentWillMount() {
		let animalID = this.props.match.params.id
		this.props.dispatch(fetchAnimal(animalID))
	}

	componentWillReceiveProps(nextProps, nextState) {
		if (this.props.currentAnimal.animalNotFound) {
			return true
		}
		
		if ((this.props.currentAnimal.id !== nextProps.currentAnimal.id)) {
			this.setState((state, props) => { return { currentAnimal: nextProps.currentAnimal }});
		}

		if ((nextProps.currentAnimal !== this.props.currentAnimal)) {
			if(this.state.newHistory === null) { 
				this.setState((state, props) => { return { newHistory: nextProps.currentAnimal.history[0] }});
				return true
			}
		}
		return false
	}

	shouldComponentUpdate(nextProps, nextState) {
		if ((nextProps.isScriptLoaded && nextProps.isScriptLoadSucceed) || 
				(this.props.isScriptLoaded && this.props.isScriptLoadSucceed)) {
				if ((nextProps.currentAnimal.history || this.props.currentAnimal.history) || nextProps.currentAnimal.animalNotFound) {
						return true
				} else {
						return false
				}
		}
	}

	componentDidUpdate (nextProps, nextState) {
		let currentAnimal = this.props.currentAnimal
		let positionHistory = []
		currentAnimal.history.map((event, i) => {
			if(event.lat && event.lng) {
				positionHistory.push(event)
			}
		})
		if (google === undefined) {
			
			google = window.google;

			map = new google.maps.Map(this.refs.map, {
				zoom: 14,
				gestureHandling: 'greedy',
				disableDefaultUI: true,
				fullscreenControl: true,
				center: {
					lat: positionHistory[0].lat,
					lng: positionHistory[0].lng
				}
			})

			let arrLength = currentAnimal.history.length;

			positionHistory.map((event, index) => {
				let customMarker = {
					url: require(`./images/mapIcons/${positionHistory[index].status}${currentAnimal.type}IconLabel.png`),
					size: new google.maps.Size(53, 40),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(21, 41),
					labelOrigin: new google.maps.Point(40, 16)
				}
				let markerLabel = (arrLength).toString()
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
				this.setState({
					newHistory: {
						...this.state.newHistory,
						lat: e.latLng.lat(),
						lng: e.latLng.lng(),
						region: this.findRegion(e.latLng, google)
					}
				})
				this.placeMarkerAndPanTo(e.latLng, map, google)
			}.bind(this))
		}
		
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
		// this.props.dispatch(setNewHistory({ ...this.props.newHistory, status }))
		this.setState({
			newHistory: {
				...this.state.newHistory,
				status
			}
		}, () => {
			if(newMarker !== undefined) {
				this.replaceMarkerIcon()
			}
		})
	}

	handleSex(e) {
		let sex = e.target.value;
		this.setState({
			newHistory: {
				...this.state.newHistory,
				sex
			}
		})
	}	

	handleSubmit(e) {
		// e.preventDefault();
		let date = new Date()
		let newHistory = this.state.newHistory
		newHistory = {
			...newHistory,
			date
		}
		if (this.state.newHistory === this.props.currentAnimal.history[0]) {
			// History has not changed. Push the currentAnimal
			let history = {};
			for (let i = 0; i < this.props.currentAnimal.history.length; ++i) {
				let key = this.props.currentAnimal.history[i].date.getTime()
				delete this.props.currentAnimal.history[i].date
				history[key] = this.props.currentAnimal.history[i];
			}
			let newCurrent = this.props.currentAnimal
			newCurrent = {
				...newCurrent,
				history: {
					...history
				}
			}
			this.props.dispatch(updateAnimal(newCurrent.id, newCurrent))
		
		} else {
			// History has changed
			// Has location changed
			if(newHistory.lat === this.props.currentAnimal.history[0].lat && newHistory.lng === this.props.currentAnimal.history[0].lng) {
				newHistory.lat = null
				newHistory.lng = null
				newHistory.region = null
			}			
			
			this.props.currentAnimal.history.push(newHistory)
			// Do something amazing in a loop that grabs the new date and keys each item in history with that transformed date
			let history = {};
			for (let i = 0; i < this.props.currentAnimal.history.length; ++i) {
				let key = this.props.currentAnimal.history[i].date.getTime()
				delete this.props.currentAnimal.history[i].date
				history[key] = this.props.currentAnimal.history[i];
			}
			let newCurrent = this.props.currentAnimal
			newCurrent = {
				...newCurrent,
				history: {
					...history
				}
			}
			this.props.dispatch(updateAnimal(newCurrent.id, newCurrent))
		}
	}

	// Map Methods

	replaceMarkerIcon() {
        newMarker.setMap(null)
        newMarker = new google.maps.Marker({
            position: {
				lat: this.state.newHistory.lat,
				lng: this.state.newHistory.lng
			},
            map,
            icon: require(`./images/mapIcons/${this.state.newHistory.status}${this.props.currentAnimal.type}Icon.png`)
		});
		map.panTo(newMarker.position);
    }

	placeMarkerAndPanTo(latLng, map, google) {
		if(newMarker !== undefined) {
			newMarker.setMap(null)
		}
		newMarker = new google.maps.Marker({
			position: latLng,
			map,
			icon: require(`./images/mapIcons/${this.state.newHistory.status}${this.props.currentAnimal.type}Icon.png`)
		});
		map.panTo(latLng);
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
	}

	handleDelete(e) {
		e.preventDefault()
		const animalID = this.props.match.params.id
		const dispatch = this.props.dispatch
		
			dispatch(deleteAnimal(animalID))
				.then(this.setState((state, props) => { return { redirect: true }}))
				.catch(err => console.log(err))	
	}
		
	render() {

		let animal = this.props.currentAnimal
		if (this.props.currentAnimal.animalNotFound === true ) {
			return (
					<Redirect to="/list" />
			)
		} else if (!animal.history) {
			return(
				<div>Loading...</div>
			)
		} else if (animal.history) {
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
										checked={this.state.newHistory.status === "lost"}
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
										checked={this.state.newHistory.status === "found"}
									/>
									<label htmlFor="statusFound"></label>
								</div>
							</div>
							<div className="mapRow">
								<div ref="map" id="map" style={{height: "250px", width:"100%"}}></div>
							</div>
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
									value={this.state.newHistory.sex}
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
								>Submit</Link>
								<button
								className="formButton" 
								onClick={this.handleDelete}
							>Delete</button>
							<span className="formIndicia">* Required Field</span>
						</form>
					</div>
					
					{this.state.redirect === true ? <Redirect to="/list" /> : null}
				</div>
			)
		}
	}
}


const LoadConnector = connect(state => {
    return {
		currentAnimal: state.animal.currentAnimal
    }
})(Update);
export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector) 