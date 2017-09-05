import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import regions from './GoogleMap/geojson.json';
import { addAnimal } from './actions/firebaseActions';
import { currentAnimal, setNewHistory } from './actions/animalActions';
import scriptLoader from 'react-async-script-loader';

const baseUrl = 'https://raw.githubusercontent.com/m-madden/lostandfound/master/';
const iconUrl = './images/mapIcons/'

let google
let map
let marker
let currentPoly

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            pos: null,
            sex: "male",
            status: "lost"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleSex = this.handleSex.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this);
        this.findRegion = this.findRegion.bind(this);
        this.replaceMarkerIcon = this.replaceMarkerIcon.bind(this);
    }

    // Lifecycle Methods
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
                map.addListener('click', function(e) {
                    this.findRegion(e.latLng, google);
                    
                    this.placeMarkerAndPanTo(e.latLng, map);
                }.bind(this));
            }
        }
    }

    componentWillUnmount() {
        google = undefined
    }

    // Form Methods
    handleChange(e) {
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
        this.props.dispatch(setNewHistory({
            ...this.props.newHistory,
            status
        }))

        if(marker) {
            var location = new google.maps.LatLng(this.props.newHistory.lat, this.props.newHistory.lng)
            this.replaceMarkerIcon(location, map, status, this.props.currentAnimal.type)
        }
    }

    handleType(e) {
        let type = e.currentTarget.name === "type" ? e.currentTarget.value : null;
        this.props.dispatch(currentAnimal({
            ...this.props.currentAnimal,
            type
        }));
        
        if(marker) {
            var location = new google.maps.LatLng(this.props.newHistory.lat, this.props.newHistory.lng)
            this.replaceMarkerIcon(location, map, this.props.newHistory.status, type)
        }
    }

    handleSex(e) {
        let sex = e.target.value;
        this.props.dispatch(setNewHistory({
            ...this.props.newHistory,
            sex
        }))
    }

    handleSubmit(e) {
        e.preventDefault();
        let date = new Date().getTime()
        let setInitialHistory = new Promise((resolve, reject) => {
            this.props.currentAnimal.history = new Object();
            this.props.currentAnimal.history[date] = this.props.newHistory
            this.props.currentAnimal.history[date] ? resolve() : reject()
        })

        setInitialHistory
            .then(() => {
                this.setState({redirect: true})
                this.props.dispatch(addAnimal(this.props.currentAnimal))
            }).catch((e) => e)
    }
    
    // Map Methods
    replaceMarkerIcon(latLng, map, status, type) {
        marker.setMap(null)
        marker = new google.maps.Marker({
            position: latLng,
            map,
            icon: require(`./images/mapIcons/${status}${type}Icon.png`)
        });
    }

    placeMarkerAndPanTo(latLng, map) {
        if(marker !== undefined) {
            marker.setMap(null)
        }
        marker = new google.maps.Marker({
            position: latLng,
            map,
            icon: require(`./images/mapIcons/${this.props.newHistory.status}${this.props.currentAnimal.type}Icon.png`)
        });
        map.panTo(latLng);
    }

    findRegion(latLng, google) {
        var regionName;
        for(var i=0; i<regions.length;i++) {
            currentPoly = new google.maps.Polygon({paths: regions[i].polygon});
            if(google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
                regionName = regions[i].name;
            }
        }
        var region = regionName !== undefined ? regionName : "Outside Defined Regions"
        this.props.dispatch(setNewHistory({
            ...this.props.newHistory,
            lat: latLng.lat(),
            lng: latLng.lng(),
            region: region,
            date: new Date()
        }))
    }

    render() {
        let newAnimal = this.props.currentAnimal;
        let newHistory = this.props.newHistory
        var statusText;
        newHistory.status === "found" ?
            statusText = "found" :
            statusText = "last seen";
        return(
            <div className="addContent content">
                <Navigation/>
                <div className="topContainer">
                    <h2 className="pageHeader">Add New Animal</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="formRow">
                            <div className="radio">
                                <span>Lost</span>
                                <input 
                                    type="radio"
                                    id="statusLost" 
                                    name="status" 
                                    value="lost"
                                    onChange={this.handleStatus}
                                    checked={newHistory.status === "lost"}
                                />
                                <label htmlFor="statusLost"></label>
                            </div>
                            <div className="radio">
                                <span>Found</span>
                                <input 
                                    type="radio"
                                    id="statusFound" 
                                    name="status"
                                    value="found" 
                                    onChange={this.handleStatus}
                                    checked={newHistory.status === "found"}
                                />
                                <label htmlFor="statusFound"></label>
                            </div>
                        </div>
                        <div className="formRow">
                            <div className="radio">
                                <span>Dog</span>
                                <input 
                                    type="radio"
                                    value="dog"
                                    id="typeDog"
                                    name="type"
                                    checked={this.props.currentAnimal.type === "dog"}
                                    onChange={this.handleType}
                                />
                                <label htmlFor="typeDog"></label>
                            </div>
                            <div className="radio">
                                <span>Cat</span>
                                <input 
                                    type="radio"
                                    value="cat"
                                    id="typeCat"
                                    name="type"
                                    checked={this.props.currentAnimal.type === "cat"}
                                    onChange={this.handleType}
                                />
                                <label htmlFor="typeCat"></label>
                            </div>
                        </div>
                        <div className="mapRow">
                            <label>Location{newHistory.region ? <span>: {newHistory.region}</span> : null}
                                <p>Click on the map to mark the location where the {newAnimal.type} was {statusText}.</p>
                            </label>
                            <div ref="map" id="map" style={{height: "250px", width:"100%"}}></div>
                        </div>
                        <div className="formRow">
                            <label htmlFor="name">Name</label>
                            <input 
                                name="name"
                                ref="name"
                                required
                                id="name" 
                                type="text" 
                                onChange={this.handleChange} 
                                value={newAnimal.name}
                            />
                        </div>
                        <div className="formRow">
                            <label htmlFor="sex">Sex</label>
                            <select 
                                name="sex"
                                ref="sex" 
                                id="sex" 
                                onChange={this.handleSex}
                                value={newAnimal.sex}
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
                                    ref="color" 
                                    required
                                    id="color" 
                                    type="text" 
                                    onChange={this.handleChange} 
                                    value={newAnimal.color}
                                />
                            </div>
                            <div className="formSpanOne">
                                <label htmlFor="breed">Breed</label>
                                <input 
                                    name="breed"
                                    ref="breed" 
                                    id="breed" 
                                    type="text" 
                                    onChange={this.handleChange} 
                                    value={newAnimal.breed}
                                />
                            </div>
                        </div>
                        <button type="submit" className="formButton">Save</button>
                        <span className="formIndicia">* Required Field</span>
                        
                    </form>
                    {this.state.redirect ? <Redirect to="/list" /> : null}
                </div>
            </div>
        )
    }
}

const LoadConnector = connect(state => {
    return {
        currentAnimal: state.animal.currentAnimal,
        newHistory: state.animal.newHistory,
        mapData: state.mapData
    }
})(Add)

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector)
