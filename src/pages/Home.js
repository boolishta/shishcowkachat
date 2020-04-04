import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../services/firebase";
import { updateName } from '../helpers/auth';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      user: auth().currentUser,
      nickName: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doSignOut = this.doSignOut.bind(this);
  }
  doSignOut() {
    auth().signOut().then(function() {
    }).catch(function(error) {
      // An error happened.
    });
  }
  handleChange(event) {
    this.setState({
      nickName: event.target.value
    })
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' , nickName: ''});
    try {
      await updateName(this.state.nickName);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  render() {  
    return (<>
      <div>Домашняя страница</div>
      <div>mail: {this.state.user.email}</div>
      <div>nickname: {this.state.user.displayName}</div>
      <form onSubmit={this.handleSubmit}>
        <input placeholder="nick" onChange={this.handleChange} value={this.state.nickName}></input>
        <button>Change Nickname</button>
      </form>
      <ul>
        <li><Link to="/chat">Shishcowka Chat</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
      <div><button onClick={this.doSignOut}>Sign Out</button></div>
      </>
    )
  }
}

export default Home;