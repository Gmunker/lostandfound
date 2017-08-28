import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import scriptLoader from 'react-async-script-loader';
import { fetchAnimal } from './actions/animalsActions';
import { animalInfo, currentAnimal, setNewHistory } from './actions/animalActions';
import { updateAnimal, deleteAnimal } from './actions/firebaseActions';
import { connect } from 'react-redux';
import regions from './GoogleMap/geojson.json';
<<<<<<< HEAD
=======

>>>>>>> ee07a0f58ee47c5f63f85af0584b3a8b8d336beb

var google
var map
var marker
class Update extends Component {
<<<<<<< HEAD
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
		// Make sure it only writes to the same position appended to the end of history
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
		let newHistory = this.state.newHistory
		let history = this.props.animal.history

		let addNewHistory = new Promise((resolve, reject) => {
			if (newHistory.status !== history[0].status || 
				newHistory.lat !== history[0].lat || 
				newHistory.lng !== history[0].lng || 
				newHistory.sex !== history[0].sex) {
					this.setState((state, props) => { 
						return { 
							newHistory: {
								...state.newHistory, 
								date: new Date()} }
							},
							this.props.animal.history.push(this.state.newHistory)
						);

						resolve()	

				} else {
					reject("No changes to history to add")
				}
		})

		// addNewHistory
		// 	.then(() => {
		// 		this.props.dispatch(updateAnimal(this.state.animal.id, this.state.animal))
		// 	})
		// 	.catch((err) => {
		// 		this.props.dispatch(updateAnimal(this.state.animal.id, this.state.animal))
		// 		console.log(err)
		// 	})
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
=======
    constructor(props) {
    super(props);
    this.state = {
        newHistory: {
            lat: null,
            lng: null,
            status: null,
            date: null,
            sex: null,
            uid: null
        }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSex = this.handleSex.bind(this);
    this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this);
    this.findRegion = this.findRegion.bind(this);
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
							
							if (!this.state.newHistory.sex && !this.state.newHistory.status) {
								this.setState((state, props) => { return { newHistory: {
									...state.newHistory,
									sex: nextProps.animal.history[0].sex,
									status: nextProps.animal.history[0].status
								} }});
							}
							 

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
									console.log("anything")
                    this.findRegion(e.latLng, google)
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
            breed: ref.breed.value
        }))
    }
    handleStatus(e) {
        let status = e.currentTarget.name === "status" ? e.currentTarget.value : null;
        this.setState((state, props) => { return { newHistory: {
            ...state.newHistory,
            status
        } }});
    }
    handleSex(e) {
        let sex = e.target.value;
        this.setState((state, props) => { return { newHistory: {
            ...state.newHistory,
            sex
        } }});
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
    }
    findRegion(latLng, google) {
			
        var regionName;
        for(var i=0; i<regions.length;i++) {
            var currentPoly = new google.maps.Polygon({paths: regions[i].polygon});
            if(google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
                regionName = regions[i].name;
            }
        }
				var region = regionName !== undefined ? regionName : "Outside Defined Regions"
        this.setState((state, props) => { return { newHistory: {
            ...state.newHistory,
            lat: latLng.lat(),
            lng: latLng.lng(),
            region: region
        } }});
	}
	
    handleSubmit(e) {
		e.preventDefault();
		let newHistory = this.state.newHistory
		let history = this.props.animal.history
		let index = history.length - 1
		if (newHistory.status !== history[index].status || newHistory.lat !== history[index].lat || newHistory.lng !== history[index].lng || newHistory.sex !== history[index].sex) {
			this.props.animal.history.push(this.state.newHistory);
		} else {
			console.log("match")
		}
		const historyLength = this.props.animal.history.length
		if (this.props.animal.history.length === historyLength + 1) {
			console.log(history)
		} else {
			console.log("Failure")
			console.log(history)
		}
	}

    render() {
    let animal = this.props.animal;
    let animalHistory = animal.history.sort(function(a,b) {
        return new Date(a.date) - new Date(b.date)
    })
    let historyLength = animalHistory.length - 1;
        return(
        <div className="addContent content">
            <Navigation />
            <div className="topContainer">
                <h2 className="pageHeader">Update Animal</h2>
                <form>
                    <div className="formRow">
                        {/* <div className="formSpanOne radio"> */}
                            <label>Lost</label>
                            <select
                                name="status" 
                                id="status" 
                                ref="status"
                                onChange={this.handleStatus} 
                                value={this.state.newHistory.status}
                            >
                                <option value="lost">Lost</option>
                                <option value="lost">Found</option>
                            </select>
                            {/* <input 
                                type="radio" 
                                id="statusLost" 
                                name="status" 
                                onChange={this.handleStatus} 
                                value="lost" 
                                checked={this.state.newHistory.status === "lost"}
                            /> */}
                            {/* <label htmlFor="statusLost"></label>
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
                        </div> */}
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
>>>>>>> ee07a0f58ee47c5f63f85af0584b3a8b8d336beb
