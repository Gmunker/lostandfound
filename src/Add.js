import React, { Component } from 'react';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Location: "",
            Gender: "m",
            Color: "",
            Breed: "",
            Status: "Lost",
            Type: "Dog",
            Date: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.writeCurrentTime = this.writeCurrentTime.bind(this);
    }

    writeCurrentTime(event) {
        var d = new Date(event.target.value);
        var Year = d.getFullYear();
        var Month = (d.getMonth() + 1);
        var Day = d.getDate();
        var Hours = d.getHours();
        var Minutes = d.getMinutes();
        var Seconds = d.getSeconds();
        this.setState({Date: Year + "-" + Month + "-" + Day + " " + Hours + ":" + Minutes + ":" + Seconds}, () => { 
            this.props.addAnimal(this.state);
        });
}

    handleChange(event) {
        event.target.name === "name" ?
        this.setState({Name: event.target.value}) :
        event.target.name === "location" ?
        this.setState({Location: event.target.value}) :
        event.target.name === "sex" ?
        this.setState({Gender: event.target.value}) :
        event.target.name === "color" ?
        this.setState({Color: event.target.value}) :
        event.target.name === "breed" ?
        this.setState({Breed: event.target.value}) :
        event.target.name === "status" ?
        this.setState({Status: event.target.value}) :
        this.setState({Type: event.target.value})
    }

    render() {
        return(
            <div className="addContent content">
                <div className="topContainer">
                    <form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input name="name" id="name" type="text" onChange={this.handleChange} value={this.state.name}/>
                        </div>
                        <div>
                            <label htmlFor="location">Location*</label>
                            <input name="location" id="location" type="text" onChange={this.handleChange} value={this.state.location} required/>
                        </div>
                        <div>
                            <label htmlFor="sex">Sex</label>
                            <select name="sex" id="sex" onChange={this.handleChange} value={this.state.sex}>
                                <option value={"m"}>Male</option>
                                <option value={"f"}>Female</option>
                            </select>
                        </div>
                        <div className="formRow">
                            <div className="formSpanOne">
                                <label htmlFor="color">Color*</label>
                                <input name="color" id="color" type="text" onChange={this.handleChange} value={this.state.color} required/>
                            </div>
                            <div className="formSpanOne">
                                <label htmlFor="breed">Breed</label>
                                <input name="breed" id="breed" type="text" onChange={this.handleChange} value={this.state.breed}/>
                            </div>
                        </div>
                        <div className="formRow">
                            <div className="radio">
                                <span>Lost</span>
                                <input type="radio" id="statusLost" name="status" onChange={this.handleChange} value="Lost" checked={true} />
                                <label htmlFor="statusLost"></label>
                            </div>
                            <div className="radio">
                                <span>Found</span>
                                <input type="radio" id="statusFound" name="status" onChange={this.handleChange} value="Found"/>
                                <label htmlFor="statusFound"></label>
                            </div>
                        </div>
                        <div className="formRow">
                            <div className="radio">
                                <span>Dog</span>
                                <input type="radio" id="typeDog" name="type" value="Dog" onChange={this.handleChange} checked={true} />
                                <label htmlFor="typeDog"></label>
                            </div>
                            <div className="radio">
                                <span>Cat</span>
                                <input type="radio" id="typeCat" name="type" value="Cat" onChange={this.handleChange}/>
                                <label htmlFor="typeCat"></label>
                            </div>
                        </div>
                        <button value={Date()} onClick={this.writeCurrentTime}>Save</button>
                        <span className="formIndicia">* Required Field</span>
                    </form>
                </div>
                <nav className="pageNavigation">
                    <button onClick={this.props.switchPage} value="List">View Full List</button>
                </nav>
            </div>
        )
    }
}

export default Add;