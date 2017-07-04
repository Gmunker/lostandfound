import React, { Component } from 'react';

function FormatDate(date) {
    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = date.slice(0,4);
    let month = monthName[date.slice(5,7) - 1];
    let day = date.slice(8,10);
    return (
        <div>{month} {day}, {year}</div>
    )
}

{/* Formats the gender info from f/m to Female/Male */}
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
                    <button onClick={props.switchPage} value="Update">Update</button>
            </nav>
        </div>
    )
}

class Detail extends Component {

   	render() {
        return(
            <div className="content">
                <CurrentAnimal Animal={this.props.Animal}/>
                <nav className="pageNavigation detail-navigation">
                    <button onClick={this.props.switchPage} value="List">View List of Animals</button>
                </nav>
            </div>
        )
    }


    // return(
    //         <div className="content">
    //             <div className="topContainer">
    //                 <div className="dogImages">
    //                     <img onClick={this.imageLink} data-animal={0} className="dogImages__image1" src={dogOne} alt=""/>
    //                     <img onClick={this.imageLink} data-animal={1} className="dogImages__image2" src={dogTwo} alt=""/>
    //                     <img onClick={this.imageLink} data-animal={2} className="dogImages__image3" src={dogThree} alt=""/>
    //                     <img onClick={this.imageLink} data-animal={3} className="dogImages__image4" src={dogFour} alt=""/>
    //                 </div>
    //             </div>
    //             <nav className="pageNavigation">
    //                 <button onClick={this.props.switchPage} value="List">View List of Animals</button>
    //                 <button onClick={this.props.switchPage} value="Add">Add New Animal</button>
    //             </nav>
    //         </div>
    //     )

}

export default Detail;