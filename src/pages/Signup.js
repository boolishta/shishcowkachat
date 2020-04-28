import React, { Component } from "react"
import { Link } from "react-router-dom"
import { signInWithGitHub, signInWithGoogle, signup } from "../helpers/auth"
import { Container, Typography, TextField, Button } from "@material-ui/core"
import style from "./Login.module.css"

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      email: "",
      password: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.googleSignIn = this.googleSignIn.bind(this)
    this.githubSignIn = this.githubSignIn.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    this.setState({ error: "" })
    try {
      await signup(this.state.email, this.state.password)
    } catch (error) {
      this.setState({ error: error.message })
    }
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
  render() {
    return (
      <Container component='main' maxWidth='xs' className={style.main}>
        <Typography component='h1' variant='h5'>
          Sign Up To <Link to='/'>ShishcowkaChat</Link>
        </Typography>
        <Typography>Fill i the form below to create an account</Typography>

        <form onSubmit={this.handleSubmit}>
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

          {this.state.error ? <p>{this.state.error}</p> : null}
          <Button type='submit' variant='contained' color='primary'>
            Sign Up
          </Button>
        </form>
        <Typography>or</Typography>
        <Button
          onClick={this.googleSignIn}
          type='button'
          variant='contained'
          color='primary'
        >
          Sign up with Google
        </Button>
        <Button
          type='button'
          onClick={this.githubSignIn}
          variant='contained'
          color='primary'
        >
          Sign up with GitHub
        </Button>
        <hr></hr>
        <Typography>
          Already have an account? <Link to='/login'>Login</Link>
        </Typography>
      </Container>
    )
  }
}
