import { Button, Container, TextField, Typography } from "@material-ui/core"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { updateName } from "../helpers/auth"
import { auth } from "../services/firebase"
import Header from "./Header"
import style from "./Home.module.css"
import Alert from "@material-ui/lab/Alert"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: auth().currentUser,
      error: null,
      changeableName: "",
      nickName: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      changeableName: event.target.value,
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    if (this.state.changeableName.trim().length === 0) {
      this.setState({
        error: "is empty",
      })
    } else {
      this.setState({ error: "", changeableName: "" })
      try {
        await updateName(this.state.changeableName)
        let nickName = auth().currentUser.displayName
        this.setState({ nickName })
      } catch (error) {
        this.setState({ error: error.message })
      }
    }
  }
  componentDidMount() {
    this.setState({ nickName: this.props.displayName })
  }
  render() {
    const { authenticated } = this.props
    return (
      <>
        <Container maxWidth='xs' className={style.main}>
          <Header
            displayName={this.state.nickName}
            authenticated={authenticated}
          />

          {this.props.authenticated ? (
            <>
              <Typography className={style.link}>
                <Link to='/chat'>Go to ShishcowkaChat</Link>
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  size='small'
                  label='change your nick'
                  onChange={this.handleChange}
                  value={this.state.changeableName}
                />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='small'
                >
                  Ok
                </Button>
              </form>
              {this.state.error && (
                <Alert severity='warning' className={style.warning}>
                  {this.state.error}
                </Alert>
              )}
            </>
          ) : (
            <Typography>
              <Link to='/login' className={style.login}>
                Login
              </Link>
              <Link to='/signup'>Register</Link>
            </Typography>
          )}
        </Container>
      </>
    )
  }
}

export default Home
