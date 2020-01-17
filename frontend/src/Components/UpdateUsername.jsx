import React, { Component } from 'react';
import axios from 'axios';

class UpdateUsername extends Component {

  updateUser() {
    const curname = document.getElementById("update-input").value;
    const newname = document.getElementById("setNew-input").value;
    const usernames = this.props.data.map(data => data.username);

    usernames.includes(curname) ?
      axios.get(`http://localhost:5000/update?curname=${encodeURI(curname)}&newname=${encodeURI(newname)}`).then(
        response => console.log(response)
      ) : console.log("Username not found!!!");

  }

  render() {
    return (
      <div className="update-username">
        <input className="username-input-field" id="update-input" placeholder="Current name" />
        <input className="username-input-field" id="setNew-input" placeholder="Change to" />
        <button className="username-update-btn" id="update-btn" onClick={() => this.updateUser()}>Update</button>
      </div>
    )
  }
}

export default UpdateUsername;