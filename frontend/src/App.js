import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Usernames from './Components/Usernames.jsx';
import UpdateUsername from './Components/UpdateUsername.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  getData() {
    axios.get('http://localhost:5000').then(
      response => {
        this.setState({ data: [...response.data] });
      }
    );
  }

  render() {
    return (
      <Router>
        <div>
          <h2>MERN App</h2>
          <div>
            <Link to="/">Home</Link>
            <Link to="/update">Update</Link>
          </div>

          <Switch>
            <Route path="/update">
              <UpdateUsername data={this.state.data} />
            </Route>
            <Route path="/">
              <Usernames getData={() => this.getData()} data={this.state.data} />
            </Route>
          </Switch>

        </div>
      </Router>
    )
  }
}

export default App;