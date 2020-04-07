import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { auth, db } from "../services/firebase";
import Header from "./Header";
import style from './Chat.module.css';

export default class Chat extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toEnd = this.toEnd.bind(this);
  }
  toEnd() {
    let block = document.getElementById("test");
    block.scrollTop = block.scrollHeight;
  }
  async componentDidMount() {
    this._isMounted = true;
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this._isMounted && this.setState({ chats });
        this.toEnd();
      });
    } catch (error) {
      this.setState({ error: error.message });
    }    
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
        user: this.state.user.displayName
      });
      this.setState({ content: '' });
      this.toEnd();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }  
  componentDidUpdate() {
    this.toEnd();
  }
  
  render() {
    const myId = 'test';
    return (
      <Container>
        <Row>
          <Col>
            <Header displayName={this.state.user.displayName} authenticated />
          </Col>
        </Row>
        <div id={myId} className={style.chat}>
          { this.state.chats.map(chat => {
              return (
                <Row key={chat.timestamp}>
                  <Col sm={4}>
                    <strong>{chat.user}</strong>:
                          </Col>
                  <Col sm={8}>
                    {chat.content}
                  </Col>
                </Row>)
              })
          }
        </div>

        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className={style.send}>
                <Form.Control onChange={this.handleChange} value={this.state.content} type="text" required></Form.Control>
                  {this.state.error && <p>{this.state.error}</p>}
                <Button type="submit" >Send</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
