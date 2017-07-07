import React, { Component } from 'react';
import Navigation from './Navigation';

function FormatDate(date) {
    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = date.slice(0,4);
    let month = monthName[date.slice(5,7) - 1];
    let day = date.slice(8,10);
    return (
        <div>{month} {day}, {year}</div>
    )
}

// Formats the gender info from f/m to Female/Male
function FormatGender(gender) {
    return (
        <div>
            {gender === "f" ?
                    "Female" :
                    "Male"}
        </div>
    )
}

const CurrentAnimal = (props) => {
    return(
        <div className="detail-main topContainer">
            <div className="mainText">
                <div className="statusDetail">{props.Animal.Type} {props.Animal.Status}</div>
                <div>{FormatDate(props.Animal.Date)}</div>
                <div className="name">{props.Animal.Name}</div>
                <hr/>
                <div>{props.Animal.DateDetail}</div>
                <div>{props.Animal.Location}</div>
                <div>{props.Animal.Color}</div>
                <div>{FormatGender(props.Animal.Gender)}</div>
                <div>{props.Animal.Breed}</div>
            </div>
            <nav className="pageNavigation detail-navigation">
                <button onClick={() => props.navSwitch("Update")} value="Update">Update</button>
            </nav>
        </div>
    )
}

class Detail extends Component {

   	render() {
        return(
            <div className="content">
                <Navigation navSwitch={this.props.navSwitch} ActivePage="Detail"/>
                <CurrentAnimal navSwitch={this.props.navSwitch} Animal={this.props.Animal}/>
            </div>
        )
    }
}

export default Detail;