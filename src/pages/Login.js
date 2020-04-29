import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from '../css/Login.module.css'
import { signin, signInWithGitHub, signInWithGoogle } from '../helpers/auth'

export default class Login extends Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      email: '',
      password: '',
      loading: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.googleSignIn = this.googleSignIn.bind(this)
    this.githubSignIn = this.githubSignIn.bind(this)
  }
  async googleSignIn() {
    try {
      await signInWithGoogle()
    } catch (error) {
      this.setState({ error: error.message })
    }
  }
  async githubSignIn() {
    try {
      await signInWithGitHub()
    } catch (error) {
      this.setState({ error: error.message })
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    this._isMounted = true
    event.preventDefault()
    this.setState({ loading: true })
    this.setState({ error: '' })
    try {
      await signin(this.state.email, this.state.password)
      this._isMounted && this.setState({ loading: false })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }
  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <Container component='main' className={style.main}>
        <Typography component='h1' variant='h5'>
          Login to <Link to='/'>ShishcowkaChat</Link>
        </Typography>
        <Typography>
          Fill in the form below to login to your account.
        </Typography>

        <form autoComplete='off' onSubmit={this.handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={this.handleChange}
            value={this.state.email}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            autoComplete='current-password'
            type='password'
            onChange={this.handleChange}
            value={this.state.password}
          />

          {this.state.error && (
            <Alert severity='error'>{this.state.error}</Alert>
          )}
          {this.state.loading ? (
            <div>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled
              >
                Login
              </Button>
              <CircularProgress />
            </div>
          ) : (
            <Button type='submit' variant='contained' color='primary'>
              Login
            </Button>
          )}
        </form>
        <Typography>or</Typography>
        <Button
          onClick={this.googleSignIn}
          type='button'
          variant='contained'
          color='primary'
        >
          Login with Google
        </Button>
        <Button
          onClick={this.githubSignIn}
          type='button'
          variant='contained'
          color='primary'
        >
          Login with GitHub
        </Button>
        <hr />
        <Typography>
          Don't have an account? <Link to='/signup'>Sign up</Link>
        </Typography>
      </Container>
    )
  }
}
