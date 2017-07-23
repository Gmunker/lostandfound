import React, { Component } from 'react';
import Navigation from './Navigation';
import dateFormat from 'dateformat';

import { connect } from 'react-redux';

class Add extends Component {
    constructor(props) {
    super(props);
    this.state = {
        name: "",
        location: "",
        gender: "",
        color: "",
        breed: "",
        status: {
            statusLost: false,
            statusFound: false,
        },
        type: {
            isDog: false,
            isCat: false
        },
        date: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.writeCurrentTime = this.writeCurrentTime.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

    writeCurrentTime(event) {
        this.setState({Date: event.target.value}, () => { 
            this.props.addAnimal(this.state);
        });
        
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState((state, props) => { return { ...this.state, date: new Date() }}, () => {
            console.log(this.state)
        });
    }
    handleChange(e) {
        let ref = this.refs;
        this.setState((state, props) => { return {
            ...this.state, 
            name: ref.name.value,
            location: ref.location.value,
            color: ref.color.value,
            breed: ref.breed.value,
            date: 0,
        }});
    }

    handleStatus(e) {
        const ref = this.refs;
        this.setState((state, props) => { 
            return { 
                ...this.state,
                status: {
                    statusLost: ref.statusLost.checked,
                    statusFound: ref.statusFound.checked
                }
            }
        });
    }

    handleGender(e) {
        let gender = e.target.value;
        this.setState((state, props) => { return {
            ...this.state, 
            gender
        }});
    }

    handleType(e) {
        let ref = this.refs;
        this.setState((state, props) => { return { 
            ...this.state,
            type: {
                isDog: ref.typeDog.checked,
                isCat: ref.typeCat.checked
            }
         }});
        this.state.type.isDog ? ref.typeDog.checked = false : null;
        this.state.type.isCat ? ref.typeCat.checked = false : null;
    }

    render() {
        console.log(this.props);
        return(
            <div className="addContent content">
                <Navigation navSwitch={this.props.navSwitch} ActivePage="Add"/>
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
                                value={this.state.name}
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
                                value={this.state.location}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="sex">Sex</label>
                            <select 
                                name="sex"
                                ref="gender" 
                                id="sex" 
                                onChange={this.handleGender}
                                value={this.state.gender}
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
                                    value={this.state.color}
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
                                    value={this.state.breed}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="formRow">
                            <div className="radio">
                                <span>Lost</span>
                                <input 
                                    type="radio"
                                    ref="statusLost" 
                                    id="statusLost" 
                                    name="status" 
                                    onChange={this.handleStatus}
                                />
                                <label htmlFor="statusLost"></label>
                            </div>
                            <div className="radio">
                                <span>Found</span>
                                <input 
                                    type="radio"
                                    ref="statusFound" 
                                    id="statusFound" 
                                    name="status" 
                                    onChange={this.handleStatus}
                                />
                                <label htmlFor="statusFound"></label>
                            </div>
                        </div>
                        
                        <div className="formRow">
                            <div className="radio">
                                <span>Dog</span>
                                <input 
                                    type="checkbox"
                                    value="dog"
                                    ref="typeDog"
                                    id="typeDog"
                                    name="type"
                                    checked={this.state.type.isDog}
                                    onChange={this.handleType}
                                />
                                <label htmlFor="typeDog"></label>
                            </div>
                            <div className="radio">
                                <span>Cat</span>
                                <input 
                                    type="checkbox"
                                    value="cat"
                                    ref="typeCat"
                                    id="typeCat"
                                    name="type"
                                    checked={this.state.type.isCat}
                                    onChange={this.handleType}
                                />
                                <label htmlFor="typeCat"></label>
                            </div>
                        </div>

                        <button value={dateFormat(Date(), "yyyy-mm-dd HH:MM:ss")} onClick={this.writeCurrentTime}>Save</button>
                        <button type="submit">submit button</button> 
                        <span className="formIndicia">* Required Field</span>
            </form>
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