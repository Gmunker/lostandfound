import React from 'react';

const Add = (props) => {
    return(
        <div>
            This is the Add Page
            <button onClick={props.switchPage} value="List">List</button>
        </div>
    )
}

export default Add;