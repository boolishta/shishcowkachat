import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../services/firebase";
import { updateName } from '../helpers/auth';
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      user: auth().currentUser,
      changeableName: "",
      nickName: auth().currentUser.displayName
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
      changeableName: event.target.value
    })
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' , changeableName: ''});
    try {
      await updateName(this.state.changeableName);
      this.setState({nickName: this.state.user.displayName})
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  render() {  
    return (<>
      <div>Домашняя страница</div>
      <div>your nickname: {this.state.nickName}</div>
      <Form onSubmit={this.handleSubmit}>
        <InputGroup >
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder="nick" type="text" onChange={this.handleChange} value={this.state.changeableName}/>
          <Button type="submit">Change Name</Button>
        </InputGroup>
      </Form>
      <ul>
        <li><Link to="/chat">Перейти в Shishcowka Chat</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
      <div><button onClick={this.doSignOut}>Sign Out</button></div>
      </>
    )
  }
}

export default Home;