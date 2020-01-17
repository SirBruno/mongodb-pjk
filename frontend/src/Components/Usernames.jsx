import React, { Component } from 'react';
import axios from 'axios';

class Usernames extends Component {

  delUser(id) {
    axios.get(`http://localhost:5000/delete?id=${id}`).then(
      () => this.props.getData()
    );
  }

  addUser(username) {
    username = document.getElementById("username-input").value;
    axios.get(`http://localhost:5000/add?username=${encodeURI(username)}`).then(
      () => {
        this.props.getData();
        document.getElementById("username-input").value = "";
      }
    );
  }

  render() {
    return (
      <div>
        <div className="username-field-container">
          <input id="username-input" placeholder="Username" />
          <button id="username-btn" onClick={() => this.addUser()}>Add</button>
        </div>
        <div>
          {this.props.data.map(data =>
            data.username != null ?
              <div id="username-element" key={data._id}>
                <i className="username-delete-btn fas fa-times" id={data._id} onClick={
                  (e) => { this.delUser(e.target.id) }
                }></i>
                <span>{data.username}</span>
              </div> : null
          )}
        </div>
      </div>
    )
  }
}

export default Usernames;