import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import firebase from './firebase';
import { connect } from 'react-redux';
import { animalInfo } from './actions/animalActions';

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
}

    handleChange(e) {
        let ref = this.refs;
        this.props.dispatch(animalInfo({
            ...this.props.newAnimal,
            Name: ref.name.value,
            Color: ref.color.value,
            Breed: ref.breed.value,
            Date: new Date().toString()
        }))
    }

    

    handleStatus(e) {
        let Status = e.currentTarget.name === "status" ? e.currentTarget.value : null;
        this.props.dispatch(animalInfo({
            ...this.props.newAnimal,
            Status
        }))
    }

    handleType(e) {
        let Type = e.currentTarget.name === "type" ? e.currentTarget.value : null;
        this.props.dispatch(animalInfo({
            ...this.props.newAnimal,
            Type
        }));
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

    submitForm() {
        // validation
        if(this.state.Location !== "" || this.state.Color !== "" || this.state.Breed !== "") {
            this.props.addAnimal(this.state)
            // this.setState({ fireRedirect: true })
            // <Redirect to="/list"/>
        }
    }

    componentWillUnmount() {
        this.props.dispatch(animalInfo({Type: "dog", Status: "lost"}));
    }

//This must be in componentDidUpdate in order for window.google to be present, any lifecycle prior to this, and the script is not loaded. So in ANY component we can make a map just like this, and do whatever we want with data going in or ... 

//Read below with my issue about data going out.

    componentDidUpdate() {
        let mapData = this.props.mapData;
        if (window.google.maps) {
            let map = new window.google.maps.Map(document.getElementById("map"), {
                zoom: 13,
                center: {
                    lat: 36.170295,
                    lng: -86.674846
                }
            });

            map.addListener('click', function(e) {
                findRegion(e.latLng);
                placeMarkerAndPanTo(e.latLng, map);
            });

            function findRegion(latLng) {
                console.log(latLng.lat())
                var regionName;
                for(var i=0; i<mapData.geoJson.length;i++) {
                    var currentPoly = new window.google.maps.Polygon({paths: mapData.geoJson[i].polygon});
                if(window.google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
                    regionName = mapData.geoJson[i].name;
                    }
                }
                if(regionName) {
                    console.log(regionName);



// Losing "this" for the disptach will need to figure this out tomorrow. Need to get some sleep, 
// hopefully this is setup enough for you to follow where i was going with it.

// Everything is working perfect if you comment this dispatch call out. 

                    this.props.dispatch(animalInfo({
                        ...this.props.newAnimal,
                        Location: {
                            position: this.props.newAnimal.Location.position.push({
                                lat: latLng.lat(), 
                                lng: latLng.lng(), 
                                date: new Date().toString(),
                                // region: regionName || "Outside Defined Regions"
                            }),
                            key: this.props.newAnimal.name,
                            defaultAnimation: 2                            
                        }
                    }))
// Left out the custom markers for now since I havent even looked at how they function yet and were 
// throwing an error for me before. I figured this could be added in after we get the main 
// functionality working with this.



                } else {
                    console.log("Outside defined regions");
                }
            }

            function placeMarkerAndPanTo(latLng, map) {
                var marker = new window.google.maps.Marker({
                position: latLng,
                map,
                });
                map.panTo(latLng);
            }

        }
    }

    render() {
        
        let newAnimal = this.props.newAnimal;
        console.log(newAnimal.location);
        var statusText;
        newAnimal.Status === "found" ?
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
                                    checked={newAnimal.Status === "lost"}
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
                                    checked={newAnimal.Status === "found"}
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
                                    checked={newAnimal.Type === "dog"}
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
                                    checked={newAnimal.Type === "cat"}
                                    onChange={this.handleType}
                                />
                                <label htmlFor="typeCat"></label>
                            </div>
                        </div>
                        <div className="formRow">
                            <label>Location{newAnimal.location ? <span>: {newAnimal.location.region}</span> : ""}
                                <p>Click on the map to mark the location where the {newAnimal.Type.toLowerCase()} was {statusText}.</p>
                            </label>
                            
                            {window.google ? <div ref="map" id="map" style={{height: "250px", width:"100%"}}></div> : null}
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
                                value={newAnimal.Name}
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
                                    value={newAnimal.Color}
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
                                    value={newAnimal.Breed}
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

export default connect(state => {
    return {
        newAnimal: state.animal,
        mapData: state.mapData
    }
})(Add);
