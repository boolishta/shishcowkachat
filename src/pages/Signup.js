import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { signInWithGitHub, signInWithGoogle, signup } from '../helpers/auth';
import { Form, Container, Row, Col, Button } from "react-bootstrap";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.githubSignIn = this.githubSignIn.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  async githubSignIn() {
    try {
      await signInWithGitHub();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  render() {
    return (
      <Container>
        <Row>
          <Col md={6}>
            <Form onSubmit={this.handleSubmit}>
              <h1>Sign Up To <Link to="/">ShishcowkaChat</Link></h1>
              <p>Fill i the form below to create an account</p>
              <Form.Group controlId="formBasicEmail">
                <Form.Control placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control placeholder="Password" name="password" type="password" onChange={this.handleChange} value={this.state.password}></Form.Control>
              </Form.Group>
              {this.state.error ? <p>{this.state.error}</p> : null}
              <Button type="submit">Sign Up</Button>
              <p>Or</p>
              <Button onClick={this.googleSignIn} type="button" variant="outline-danger">
                Sign up with Google
          </Button>
              <Button type="button" onClick={this.githubSignIn} variant="outline-dark">
                Sign up with GitHub
          </Button>
              <hr></hr>
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
