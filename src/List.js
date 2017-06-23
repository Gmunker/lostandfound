import React, { Component } from 'react';
import myData from './temp_api/masterList.json'


class DogTable extends React.Component {
  render() {
    var rows = [];
    this.props.dogs.forEach(function(dog) {
     
      rows.push(<ListRow dog={dog} key={dog.id} />);
    });
    return (
        
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Breed</th>
            <th>Color</th>
                        <th>Sex</th>

          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class ListRow extends React.Component {
  render() {
   var missing = this.props.dog.found ?
      this.props.dog.date :
      <span style={{color: 'red'}}>
        {this.props.dog.date}
      </span>;
    return (
      <tr>
        <td>{missing}</td>
        <td>{this.props.dog.breed}</td>

                <td>{this.props.dog.color}</td>

                <td>{this.props.dog.sex}</td>
      </tr>
    );
  }
}

const List = (props) => {
   
        return(
        <div className="listContent">
            <div className = "dTable">
                      <DogTable dogs={myData} />
            </div>
             <nav className="pageNavigation">
                    <button onClick={props.switchPage} value="Landing">Home</button>
                    </nav>
        </div>

            
        );
    }



export default List;



