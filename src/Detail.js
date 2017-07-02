import React, { Component } from 'react';

// function FormatDate(date) {
//     var year = this.date.slice(0,3);
//     var month = "July"
//     var day = "3"
//     return (
//         <div>{year}</div>
//     )
// }

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
    console.log(props.Animal);
    return(
        <div className="content detail-main">
            <div className="mainText">
                <div className="name">{props.Animal.Name}</div>
                <hr/>
                <div className="statusDetail">{props.Animal.Status}</div>
                <div>{props.Animal.DateDetail}</div>
                <div>{props.Animal.Location}</div>
                <div>{props.Animal.Color}</div>
                <div>{FormatGender(props.Animal.Gender)}</div> {/* Formats the gender info from f/m to Female/Male */}
                <div>{props.Animal.Breed}</div>
            </div>
            <nav className="pageNavigation">
                    <button onClick={props.switchPage} value="Update">Update</button>
            </nav>
        </div>
    )
}

class Detail extends Component {

   	render() {
        return(
            <div>
                <CurrentAnimal Animal={this.props.Animal}/>
                <nav className="pageNavigation">
                    <button onClick={this.props.switchPage} value="List">View List of Animals</button>
                </nav>
            </div>
        )
    }

}

export default Detail;