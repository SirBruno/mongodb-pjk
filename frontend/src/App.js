import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  delUser(id) {
    axios.get(`http://localhost:5000/delete?id=${id}`).then(
      res => {
        console.log(res);
        this.getData();
      }
    );
  }

  sendReq(username) {
    username = document.getElementById("username-input").value;

    axios.get(`http://localhost:5000/add?username=${encodeURI(username)}`).then(
      res => {
        console.log(res);
        this.getData();
      }
    );
  }

  getData() {
    axios.get('http://localhost:5000').then(
      response => this.setState(
        { data: [...response.data] }
      )
    );
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <p>Working!!!</p>
        <input id="username-input" placeholder="Username" />
        <button onClick={() => this.sendReq()}>Add</button>
        <div>
          {this.state.data.map(data =>
            data.username != null ?
              <div key={data._id}>
                <span>{data.username}</span>
                <button id={data._id} onClick={
                  (e) => { this.delUser(e.target.id) }
                }>X</button>
              </div> : null
          )}
        </div>
      </div>
    )
  }
}

export default App;