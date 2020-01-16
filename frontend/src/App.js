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
        document.getElementById("username-input").value = "";
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

    document.getElementById("username-input").addEventListener("keyup", (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        document.getElementById("username-btn").click();
      }
    })
  }

  render() {
    return (
      <div>
        <h2>MERN App</h2>
        <div className="username-field-container">
          <input id="username-input" placeholder="Username" />
          <button id="username-btn" onClick={() => this.sendReq()}>Add</button>
        </div>
        <div>
          {this.state.data.map(data =>
            data.username != null ?
              <div id="username-element" key={data._id}>
                <button className="username-delete-btn" id={data._id} onClick={
                  (e) => { this.delUser(e.target.id) }
                }>X</button>
                <span>{data.username}</span>
              </div> : null
          )}
        </div>
      </div>
    )
  }
}

export default App;