import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    fetch("/api", {
      accept: 'application/json',
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState(
              {items: result.items}
          )
        })
  }
  render() {
    const {items} = this.state;
    const users = items.map((user, idx)=>(
      <tr key={idx}>
        <td>{user[0]}</td>
        <td>{user[1]}</td>
        <td>{user[2]}</td>
      </tr>
    ));
    return (
      <div className="App">
        <table style={{"width":"50%"}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
