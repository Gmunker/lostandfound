import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import firebase from './firebase';
import { connect } from 'react-redux';
import regions from './GoogleMap/geojson.json';
import { animalInfo } from './actions/animalActions';
import scriptLoader from 'react-async-script-loader';

const baseUrl = 'https://raw.githubusercontent.com/m-madden/lostandfound/master/';

var google
var map
var marker
var currentPoly
var currentStatus
var currentType

class Add extends Component {
    constructor(props) {
    super(props);
    this.state = {
        redirect: false,
        pos: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this);
    this.findRegion = this.findRegion.bind(this);
    this.replaceMarkerIcon = this.replaceMarkerIcon.bind(this);
}

    handleChange(e) {
        let ref = this.refs;
        this.props.dispatch(animalInfo({
            ...this.props.newAnimal,
            name: ref.name.value,
            color: ref.color.value,
            breed: ref.breed.value,
            date: new Date().toString()
        }))
    }    

    handleStatus(e) {
        let Status = e.currentTarget.name === "status" ? e.currentTarget.value : null;
        this.props.dispatch(animalInfo({
            ...this.props.newAnimal,
            status: Status
        }))
        if(marker) {
            var location = new google.maps.LatLng(this.props.newAnimal.location.lat, this.props.newAnimal.location.lng)
            this.replaceMarkerIcon(location, map, Status, this.props.newAnimal.type)
        }
    }

    handleType(e) {
        let Type = e.currentTarget.name === "type" ? e.currentTarget.value : null;
        this.props.dispatch(animalInfo({
            ...this.props.newAnimal,
            type: Type
        }));
        if(marker) {
            var location = new google.maps.LatLng(this.props.newAnimal.location.lat, this.props.newAnimal.location.lng)
            this.replaceMarkerIcon(location, map, this.props.newAnimal.status, Type)
        }
    }

    handleGender(e) {
        let Gender = e.target.value;
        this.props.dispatch(animalInfo({
            ...this.props.newAnimal,
            Gender
        }))
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState((state, props) => { return {...this.state, redirect: true }}, () => {
            firebase.database().ref("Animals").push(this.props.newAnimal);
        });
    }

    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
        if(google === undefined) {
            if (isScriptLoaded && isScriptLoadSucceed) {
                google = window.google
                map = new google.maps.Map(this.refs.map, {
                    zoom: 12,
                    gestureHandling: 'greedy',
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
        this.props.dispatch(animalInfo({type: "dog", status: "lost"}));
        google = undefined
    }

    replaceMarkerIcon(latLng, map, Status, Type) {
        marker.setMap(null)
        marker = new google.maps.Marker({
            position: latLng,
            map,
            icon: baseUrl + Status + Type + "Icon.png"
        });
    }

    placeMarkerAndPanTo(latLng, map) {
        if(marker !== undefined) {
            marker.setMap(null)
        }
        marker = new google.maps.Marker({
            position: latLng,
            map,
            icon: baseUrl + this.props.newAnimal.status + this.props.newAnimal.type + "Icon.png"
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
        if(regionName) {
            this.props.dispatch(animalInfo({
                ...this.props.newAnimal,
                location: {
                    lat: [latLng.lat()],
                    lng: [latLng.lng()],
                    region: [regionName]
                }
            }));
        } else {
            this.props.dispatch(animalInfo({
                ...this.props.newAnimal,
                location: {
                    lat: latLng.lat(),
                    lng: latLng.lng(),
                    region: "Outside Defined Regions"
                }
            }));
        }
    }

    render() {
        
        let newAnimal = this.props.newAnimal;
        var statusText;
        newAnimal.status === "found" ?
            statusText = "found" :
            statusText = "last seen"
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
                                    checked={newAnimal.status === "lost"}
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
                                    checked={newAnimal.status === "found"}
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
                                    checked={newAnimal.type === "dog"}
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
                                    checked={newAnimal.type === "cat"}
                                    onChange={this.handleType}
                                />
                                <label htmlFor="typeCat"></label>
                            </div>
                        </div>
                        <div className="formRow">
                            <label>Location{newAnimal.location ? <span>: {newAnimal.location.region}</span> : ""}
                                <p>Click on the map to mark the location where the {newAnimal.type.toLowerCase()} was {statusText}.</p>
                            </label>
                            <div ref="map" id="map" style={{height: "250px", width:"100%"}}></div>
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
                                ref="gender" 
                                id="sex" 
                                onChange={this.handleGender}
                                value={newAnimal.Gender}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="neuteredmale">Neutered Male</option>
                                <option value="spayedfemale">Spayed Female</option>
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
                        </div>
                    </form>
                    {this.state.redirect ? <Redirect to="/list" /> : null}
                </div>
            </div>
        )
    }
}

const LoadConnector = connect(state => {
    return {
        newAnimal: state.animal,
        mapData: state.mapData
    }
})(Add)

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector)
