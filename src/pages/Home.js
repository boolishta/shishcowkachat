import React, { Component } from 'react';
import { Alert, Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { updateName } from '../helpers/auth';
import { auth } from "../services/firebase";
import Header from './Header';
import style from './Home.module.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      error: null,
      changeableName: "",
      nickName: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      changeableName: event.target.value
    })
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '', changeableName: '' });
    try {
      await updateName(this.state.changeableName);
      let nickName = auth().currentUser.displayName;
      this.setState({ nickName })
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  componentDidMount() {
    this.setState({ nickName: this.props.displayName })
  }
  render() {
    const { authenticated } = this.props;
    return (<>
            <Header displayName={this.state.nickName} authenticated={authenticated} />
      <Container>
        <Row className={style.navbar}>
          <Col md={8} xs={7}>
            <Link to="/chat">Go to ShishcowkaChat</Link>            
          </Col>
          <Col md={4} xs={5} className={style.login}>
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
          {this.props.authenticated &&
              <Form onSubmit={this.handleSubmit} className={style.changeName}>
                <InputGroup >
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl placeholder="change your nick" type="text" onChange={this.handleChange} value={this.state.changeableName} required/>
                  <Button type="submit">Ok</Button>
                </InputGroup>
                {this.state.error && <Alert variant="warning">Somethig wrong :(</Alert>}
              </Form>
            }
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Container>
    </>)
  }
}

export default Home;