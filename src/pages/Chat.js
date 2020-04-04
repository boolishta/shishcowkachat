import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../services/firebase";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doSignOut = this.doSignOut.bind(this);
  }
  async componentDidMount() {
    this.setState({ readError: null });
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }
  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
        user: this.state.user.displayName
      });
      this.setState({ content: '' });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }
  doSignOut() {
    auth().signOut().then(function() {
    }).catch(function(error) {
      // An error happened.
    });
  }
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <div className="chats">
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp}>{chat.user}: {chat.content}</p>
          })}
        </div>

        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.content}></input>
          {this.state.error ? <p>{this.state.writeError}</p> : null}
          <button type="submit">Send</button>
        </form>
        <div>
          Login in as: <strong>{this.state.user.displayName}</strong>
        </div>
        <div><button onClick={this.doSignOut}>Sign Out</button></div>
      </div>
    );
  }
}
