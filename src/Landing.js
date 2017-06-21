import React from 'react';

const Landing = (props) => {
    return(
        <div>
            <button onClick={props.switchPage} value="List">List</button>
            <button onClick={props.switchPage} value="Add">Add</button>
        </div>
    )
}

export default Landing;