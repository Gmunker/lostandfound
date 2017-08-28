import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import scriptLoader from 'react-async-script-loader';
import { fetchAnimal } from './actions/animalsActions';
import { animalInfo, currentAnimal, setNewHistory } from './actions/animalActions';
import { updateAnimal, deleteAnimal } from './actions/firebaseActions';
import { connect } from 'react-redux';
import regions from './GoogleMap/geojson.json';

var google
var map
var marker
class Update extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSex = this.handleSex.bind(this);
		this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this);
		this.findRegion = this.findRegion.bind(this);
	}
	
	componentWillMount() {
		this.props.dispatch(fetchAnimal(this.props.match.params.id))
	}

	componentWillUpdate (nextProps, nextState) {
		let { isScriptLoaded, isScriptLoadSucceed } = nextProps;
		var animal = this.props.currentAnimal;
		
		if (animal.history[0].lat !== null) {
			if (isScriptLoaded && isScriptLoadSucceed) { // load finished
				google = window.google;
				map = new google.maps.Map(this.refs.map, {
					zoom: 14,
					gestureHandling: 'greedy',
					disableDefaultUI: true,
					fullscreenControl: true,
					center: {
						lat: animal.history[animal.history.length - 1].lat,
						lng: animal.history[animal.history.length - 1].lng
					}
				})
				


				animal.history.map((event, index) => {
					let customMarker = {
						url: require(`./images/mapIcons/${animal.history[index].status}${animal.type}IconLabel.png`),
						size: new google.maps.Size(53, 40),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(21, 41),
						labelOrigin: new google.maps.Point(40, 16)
					}
					
					let markerLabel = animal.history.length.toString();
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
					animal.history.length -= 1
				})
				
				map.addListener('click', function(e) {
					this.findRegion(e.latLng, google)
					this.placeMarkerAndPanTo(e.latLng, map, animal.history)
				}.bind(this))
			}
		}
	}

	componentWillUnmount() {
			this.props.dispatch(animalInfo({history: [{status: "lost"}], type: "dog"}))
			google = undefined
	}
	
	handleChange(event) {   
		event.preventDefault();
			let ref = this.refs;
			this.props.dispatch(currentAnimal({
				animal: {
					...this.props.currentAnimal,
					name: ref.name.value,
					color: ref.color.value,
					breed: ref.breed.value
				}
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
	
	placeMarkerAndPanTo(latLng, map, animalHistory) {
		let index = this.props.currentAnimal.history.length
		marker = new google.maps.Marker({
			position: latLng,
			map,
			icon: require(`./images/mapIcons/${animalHistory[0].status}${this.props.animal.type}IconLabel.png`)
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
		this.setState((state, props) => { 
			return { 
				newHistory: {
					...state.newHistory,
					lat: latLng.lat(),
					lng: latLng.lng(),
					region: region
				}
			}
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		let currentHistoryLength = this.props.currentAnimal.history.length
        
        var setDate = new Promise((resolve, reject) => {
                this.props.setNewHistory({
                    ...this.props.newHistory,
                    date: new Date()
                })
                
                if(this.props.newHistory.date) {
                        resolve("Successfully Set Date");
                }
                else {
                        reject('Failure!');
                }
        });
        
        let pushHistory = new Promise((resolve, reject) => {
            this.props.currentAnimal.history.push(this.props.newHistory)
            if(currentHistoryLength !== this.props.currentAnimal.history.length){
                resolve("Successfully pushed newHistory")
            } else {
                reject("No History Pushed")
            }
        })
        
        
        let updateAnimal = new Promise((resolve, reject) => {
            this.props.dispatch(updateAnimal(this.props.currentAnimal));
        })
        
        
        setDate
            .then(() =>  { 
                pushHistory
                    .then(() => {
                        updateAnimal
                    })
        }).catch(function() {
                /* error :disappointed: */
        })

	}
		
	render() {

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
									checked={this.props.newHistory.status === "lost"}
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
								checked={this.props.newHistory.status === "found"}
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
						value={this.props.currentAnimal.name}
					/>
				</div>
				<div className="formRow">
					<label htmlFor="sex">Sex</label>
					<select 
						name="sex" 
						id="sex" 
						ref="gender" 
						onChange={this.handleSex} 
						value={this.props.newHistory.sex}
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
							value={this.props.currentAnimal.color} 
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
							value={this.props.currentAnimal.breed}
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
						onClick={() => this.props.dispatch(deleteAnimal(this.props.currentAnimal.id))}
					>Delete</Link>
					<span className="formIndicia">* Required Field</span>
				</form>
			</div>
		</div>
	)}
}


const LoadConnector = connect(state => {
    return {
				animal: state.animal.animal,
				currentAnimal: state.animal.currentAnimal,
				newHistory: state.animal.newHistory
    }
})(Update);
export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector) 
