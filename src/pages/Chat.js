import React, { Component } from "react"
import { auth, db } from "../services/firebase"
import Header from "./Header"
import style from "./Chat.module.css"
import { Container, Button, TextField, Icon } from "@material-ui/core"
import { Message } from "./Message"
import Alert from "@material-ui/lab/Alert"

export default class Chat extends Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      error: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toEnd = this.toEnd.bind(this)
  }
  toEnd() {
    let block = document.getElementById("test")
    block.scrollTop = block.scrollHeight
  }
  async componentDidMount() {
    this._isMounted = true
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = []
        snapshot.forEach(snap => {
          chats.push(snap.val())
        })
        this._isMounted && this.setState({ chats })
        this.toEnd()
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  handleChange(event) {
    this.setState({
      error: null,
      content: event.target.value,
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    if (this.state.content.trim().length === 0) {
      this.setState({
        error: "пустая строка",
      })
    } else {
      try {
        await db.ref("chats").push({
          content: this.state.content,
          timestamp: Date.now(),
          uid: this.state.user.uid,
          user: this.state.user.displayName,
        })
        this.setState({ content: "" })
        this.toEnd()
      } catch (error) {
        this.setState({ error: error.message })
      }
    }
  }
  componentDidUpdate() {
    this.toEnd()
  }

  render() {
    const myId = "test"
    return (
      <>
        <Container component='main' maxWidth='xs'>
          <Header displayName={this.state.user.displayName} authenticated />
          <div id={myId} className={style.chat}>
            {this.state.chats.map(chat => {
              let user = chat.user
              return (
                <Message
                  user={user}
                  content={chat.content}
                  key={chat.timestamp}
                />
              )
            })}
          </div>

          <form onSubmit={this.handleSubmit} className={style.send}>
            <TextField
              onChange={this.handleChange}
              value={this.state.content}
              type='text'
              required
            />
            {this.state.error && (
              <Alert severity='error'>{this.state.error}</Alert>
            )}
            <Button type='submit' endIcon={<Icon>send</Icon>}>
              Send
            </Button>
          </form>
        </Container>
      </>
    )
  }
}
