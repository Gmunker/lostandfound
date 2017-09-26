import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import scriptLoader from 'react-async-script-loader';
import { fetchAnimal } from '../actions/animalsActions';
import { currentAnimal } from '../actions/animalActions';
import { updateAnimal, deleteAnimal } from '../actions/firebaseActions';
import { connect } from 'react-redux';
import regions from '../GoogleMap/geojson.json';
import UpdateContent from './Update';

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
        this.handleName = this.handleName.bind(this)
        this.handleColor = this.handleColor.bind(this)
        this.handleBreed = this.handleBreed.bind(this)
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

			map = new google.maps.Map(this.map, {
				zoom: 14,
				gestureHandling: 'greedy',
				disableDefaultUI: true,
				fullscreenControl: true,
				clickableIcons: false,
				center: {
					lat: positionHistory[0].lat,
					lng: positionHistory[0].lng
				}
			})

			positionHistory.map((event, index) => {
				let customMarker = {
					url: require(`../images/mapIcons/${positionHistory[index].status}${currentAnimal.type}Icon.png`),
					size: new google.maps.Size(53, 40),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(21, 41),
					labelOrigin: new google.maps.Point(40, 16)
				}
				marker = new google.maps.Marker({
					position: {
						lat: event.lat,
						lng: event.lng
					},
					map,
					icon: customMarker
				})
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
    
    handleName(e) {
        this.props.dispatch(currentAnimal({
			...this.props.currentAnimal,
			name: e.target.value
		}))
    }

    handleColor(e) {
        this.props.dispatch(currentAnimal({
			...this.props.currentAnimal,
			color: e.target.value
		}))
    }

    handleBreed(e) {
        this.props.dispatch(currentAnimal({
			...this.props.currentAnimal,
			breed: e.target.value
		}))
    }

	handleStatus(status) {
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

	handleSex(sex) {
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
			this.props.currentAnimal.history.map((event, i) => {
				let key = event.date.getTime()
				delete event.date
				history[key] = event
			})
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
			this.props.currentAnimal.history.map((event, i) => {
				let key = event.date.getTime()
				delete event.date
				history[key] = event
			})
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
    
    handleDelete(e) {
		// e.preventDefault()
		const animalID = this.props.match.params.id
		const dispatch = this.props.dispatch
        dispatch(deleteAnimal(animalID))
            .then(this.setState((state, props) => { return { redirect: true }}))
            .catch(err => console.log(err))
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
            icon: require(`../images/mapIcons/${this.state.newHistory.status}${this.props.currentAnimal.type}Icon.png`)
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
			icon: require(`../images/mapIcons/${this.state.newHistory.status}${this.props.currentAnimal.type}Icon.png`)
		});
		map.panTo(latLng);
	}

	findRegion(latLng, google) {
		let regionName;
		regions.map((region, i) => {
            let currentPoly = new google.maps.Polygon({paths: region.polygon})
            if(google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
                regionName = region.name
            }
        })
		
		let region = regionName !== undefined ? regionName : "Outside Defined Regions"
		return region
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

            let newHistory = this.state.newHistory

            let Props = {
                animal: this.props.currentAnimal,
                newHistory: newHistory,
                Map: { 
                    ref: el => this.map = el,
                },
                Submit: {
                    handleSubmit: this.handleSubmit
                },
                Delete: {
                    handleDelete: this.handleDelete
                },
                Status: {
                    options: [
                        "lost",
                        "found",
                        "transferred"
                    ],
                    selectProps: {
                        label: "Status",
                        onChange: this.handleStatus,
                        value: newHistory.status,
                        name: "status",
                        ref: "status",
                        id: "status"
                    }
                },
                Sex: {
                    options: [
                        "male",
                        "female",
                        "neutered male",
                        "spayed female"
                    ],
                    selectProps: {
                        label: "Sex",
                        onChange: this.handleSex,
                        value: newHistory.sex,
                        name: "sex",
                        ref: "sex",
                        id: "sex"
                    }
                },
                Color: {
                    label: "Color",
                    name: "color",
                    ref: "color",
                    required: true,
                    id: "color",
                    onChange: this.handleColor,
                    value: animal.color
                },
                Breed: {
                    label: "Breed",
                    name: "breed",
                    ref: "breed",
                    required: true,
                    id: "breed",
                    onChange: this.handleBreed,
                    value: animal.breed
                },
                Name: {
                    label: "Name",
                    name: "name",
                    ref: "name",
                    required: true,
                    id: "name",
                    onChange: this.handleName,
                    value: animal.name
                }
            }

			return(
				<div className="addContent content">
					<Navigation />
                    <UpdateContent Props={Props}/>
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