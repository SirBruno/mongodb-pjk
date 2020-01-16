import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Usernames from './Components/Usernames.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  AddUser(username) {
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
      response => {
        this.setState({ data: [...response.data] });
      }
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
        <Usernames getData={() => this.getData()} reqData={this.state.data} />
      </div>
    )
  }
}

export default App;