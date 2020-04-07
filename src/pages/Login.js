import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";

export default class Login extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: "",
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.githubSignIn = this.githubSignIn.bind(this);
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
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    this._isMounted = true;
    event.preventDefault();
    this.setState({ loading: true })
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
      this._isMounted && this.setState({loading: false})
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  

  render() {
    return (
      <Container>
        <Row>
          <Col md={6}>
            <Form autoComplete="off" onSubmit={this.handleSubmit}>
              <h1> Login to <Link to="/">ShishcowkaChat</Link> </h1>
              <p> Fill in the form below to login to your account.</p>
              <Form.Group controlId="formBasicEmail">
                <Form.Control placeholder="Email" name="email" 
                              type="email" onChange={this.handleChange} value={this.state.email}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control placeholder="Password" name="password" onChange={this.handleChange} 
                              value={this.state.password} type="password"/>
              </Form.Group>
              {this.state.error && <Alert variant="danger" >{this.state.error}</Alert>}
               { this.state.loading  ? <div><Button type="submit" disabled>Login</Button><Spinner animation="border" size="sm"/></div>
                                      : <Button type="submit">Login</Button>}
              <p>or</p>
              <Button onClick={this.googleSignIn} type="button" variant="outline-danger">Login with Google</Button>
              <Button onClick={this.githubSignIn} type="button" variant="outline-dark">Login with GitHub</Button>
              <hr />
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}