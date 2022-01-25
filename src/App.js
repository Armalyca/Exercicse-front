import './App.css';
import React from "react";

export default class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      squares: [{ id: 1, position: '', name: 'white' }, { id: 2, position: '', name: 'white' }, { id: 3, position: '', name: 'white' }, { id: 4, position: '', name: 'white' }, { id: 5, position: '', name: 'white' }, { id: 6, position: '', name: 'white' }, { id: 7, position: '', name: 'white' }, { id: 8, position: '', name: 'white' }, { id: 9, position: '', name: 'white' }, { id: 10, position: '', name: 'white' }],
      counter: 0
    };
  };

  // Add the new color to the array and modify the position according to it
  addToList = (colorName, ctn) => {
    var idNew = ctn < 10 ? ctn : ctn % 10; //Compute the key of the newest color using the counter(if it is bigger than 10 we will modulo it by 10)
    var idToEmpty = idNew !== 0 ? idNew - 1 : 9; //Compute the color that was the newest before and that we need to erase the text of
    var idOld = ctn < 10 || idNew === 9? 0 : idNew + 1; //Compute the key of the oldest color using the key of the newest(it is one place ahead than the new color except for the first 10 ones)
    var listUpdated = this.state.squares;
    listUpdated[idNew].name = colorName; //Store the value of the color selected in the new square
    listUpdated[idToEmpty].position = '';
    listUpdated[idNew].position = 'Newest';
    listUpdated[idOld].position = ctn !== 0 ? 'Oldest' : 'Newest'; //For the first square, it will be first considered the newest before being the oldest
    return listUpdated;
  };

  handleClick = (btnName) => {
    const listUpdated = this.addToList(btnName, this.state.counter);
    this.setState(prevState => {
      return {
        squares: listUpdated,
        counter: prevState.counter + 1
      }
    });
    localStorage.setItem("state", JSON.stringify(this.state)); //We save the current state to the local storage
  };

  componentDidMount() {
    this.state = JSON.parse(localStorage.getItem('state'));

    //We either save the state in local storage to the state or the default values
      if (this.state !== null) {
          this.setState({
              squares: this.state.squares,
              counter: this.state.counter
          })
      } else {
          this.setState({
            squares: [{ id: 1, position: '', name: 'white' }, { id: 2, position: '', name: 'white' }, { id: 3, position: '', name: 'white' }, { id: 4, position: '', name: 'white' }, { id: 5, position: '', name: 'white' }, { id: 6, position: '', name: 'white' }, { id: 7, position: '', name: 'white' }, { id: 8, position: '', name: 'white' }, { id: 9, position: '', name: 'white' }, { id: 10, position: '', name: 'white' }],
            counter: 0
          })
      }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('state', JSON.stringify(nextState));
  }


  render() {
  return (
    <div className="App">
      <div>
        <button className="component-button button1" onClick={e => this.handleClick('#4169e1', e)}>Color it Royal Blue</button>
        <button className="component-button button2" onClick={e => this.handleClick('#dc143c', e)}>Color it Crimson</button>
      </div>
      <div className="lign_center">
        {//We display the 10 squares only if their color isn't white
          this.state.squares.map(data => 
            data.name !== 'white' ?
              (<div key={data.id} className="square" style={{ background: data.name }}> {data.position}</div>)
              : ''
              
      )}
      </div>
      <div>
        <button className="component-button button3" onClick={e =>this.handleClick('#dda0dd', e)}>Color it Plum</button>
        <button className="component-button button4" onClick={e =>this.handleClick('#9acd32', e)}>Color it Yellow Green</button>
      </div>
    </div>
  );
}
}

