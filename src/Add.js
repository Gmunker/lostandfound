import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import firebase from './firebase';
// import dateFormat from 'dateformat';
// import Map from './Map';

import { connect } from 'react-redux';
import { newAnimalInfo } from './actions/newAnimalActions';


class Add extends Component {
    constructor(props) {
    super(props);
    this.state = {redirect: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

    handleChange(e) {
        let ref = this.refs;
        this.props.dispatch(newAnimalInfo({
            ...this.props.newAnimal,
            Name: ref.name.value,
            Location: ref.location.value,
            Color: ref.color.value,
            Breed: ref.breed.value,
            Date: new Date().toString()
        }))
    }

    handleStatus(e) {
        let Status = e.currentTarget.name === "status" ? e.currentTarget.value : null;
        this.props.dispatch(newAnimalInfo({
            ...this.props.newAnimal,
            Status
        }))
    }

    handleType(e) {
        let Type = e.currentTarget.name === "type" ? e.currentTarget.value : null;
        this.props.dispatch(newAnimalInfo({
            ...this.props.newAnimal,
            Type
        }));
    }

    handleGender(e) {
        let Gender = e.target.value;
        this.props.dispatch(newAnimalInfo({
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

    render() {
        console.log(this.props.match)
        // const { fireRedirect } = this.state;
        let newAnimal = this.props.newAnimal;
        return(
            <div className="addContent content">
                <Navigation/>
                <div className="topContainer">
                    <h2 className="pageHeader">Add New Animal</h2>
                    <form onSubmit={this.handleSubmit}>
                    <div>
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
                        
                        <div>
                            <label htmlFor="location">Location*</label>
                            <input 
                                name="location"
                                ref="location"
                                required 
                                id="location" 
                                type="text"
                                onChange={this.handleChange} 
                                value={newAnimal.Location}
                            />
                        </div>
                        <div>
                            <label htmlFor="sex">Sex</label>
                            <select 
                                name="sex"
                                ref="gender" 
                                id="sex" 
                                onChange={this.handleGender}
                                value={newAnimal.Gender}
                            >
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        
                        <div className="formRow">
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
        newAnimal: state.newAnimal
    }
})(Add);


//  <form onSubmit={this.handleSubmit}>
// <Map google={window.google}/>