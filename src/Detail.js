import React from 'react';

const Detail = (props) => {
    return(
        <div className="landingContent">
            <div className="topContainer">
                <div>Keeper</div>
                <hr/>
                <div>LOST</div>
                <div>March 7, 2012</div>
                <div>Pennington Bend</div>
                <div>White</div>
                <div>Male</div>
                <div>Chow mix</div>
                <nav className="pageNavigation">
                    <button onClick={props.switchPage} value="Update">Update</button>
                </nav>
            </div>
            <nav className="pageNavigation">
                    <button onClick={props.switchPage} value="List">Back to List</button>
            </nav>
        </div>
    )
}

export default Detail;