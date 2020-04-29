import {
  Button,
  Container,
  Icon,
  TextField,
  Typography,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import React, { Component } from 'react'
import style from '../css/Chat.module.css'
import { auth, db } from '../services/firebase'
import Header from './Header'
import { Message } from './Message'

//FIXME: сделать частичную загрузку сообщений
export default class Chat extends Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      error: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toEnd = this.toEnd.bind(this)
  }
  toEnd() {
    let block = document.getElementById('test')
    block.scrollTop = block.scrollHeight
  }
  async componentDidMount() {
    this._isMounted = true
    try {
      db.ref('chats').on('value', snapshot => {
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
        error: 'пустая строка',
        content: '',
      })
    } else {
      try {
        await db.ref('chats').push({
          content: this.state.content,
          timestamp: Date.now(),
          uid: this.state.user.uid,
          user: this.state.user.displayName,
        })
        this.setState({ content: '' })
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
    const myId = 'test'
    let { chats, content, error } = this.state
    return (
      <>
        <Container component='main' className={style.main}>
          <Header displayName={this.state.user.displayName} authenticated />
          <Typography elevation={3} id={myId} className={style.chat}>
            {chats.map(chat => {
              let { user, content, timestamp } = chat
              return <Message user={user} content={content} key={timestamp} />
            })}
          </Typography>

          <form onSubmit={this.handleSubmit} className={style.send}>
            <TextField
              onChange={this.handleChange}
              value={content}
              type='text'
              required
            />
            <Button type='submit' endIcon={<Icon>send</Icon>} size='small'>
              Send
            </Button>
          </form>

          {error && (
            <Alert severity='error' className={style.alert}>
              {error}
            </Alert>
          )}
        </Container>
      </>
    )
  }
}
