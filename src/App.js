import React, { Component } from "react"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import style from "./App.module.css"
import Chat from "./pages/Chat"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/Signup"
import { auth } from "./services/firebase"

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} authenticated />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to='/chat' />
        )
      }
    />
  )
}

//FIXME: баг роутинг, при обновлении страницы выдается 404
//FIXME: сделать частичную загрузку сообщений
class App extends Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      loading: true,
      displayName: "",
    }
  }
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
          displayName: user.displayName,
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        })
      }
    })
  }
  render() {
    const { authenticated, displayName } = this.state
    return (
      <div className={style.app}>
        {this.state.loading === true ? (
          <Container>
            <Row>
              <Col className={style.spinner}>
                <Spinner animation='border' />
              </Col>
            </Row>
          </Container>
        ) : (
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path='/'
                render={() => (
                  <Home
                    authenticated={authenticated}
                    displayName={displayName}
                  />
                )}
              ></Route>
              <PrivateRoute
                path='/chat'
                authenticated={this.state.authenticated}
                component={Chat}
              ></PrivateRoute>
              <PublicRoute
                path='/signup'
                authenticated={this.state.authenticated}
                component={SignUp}
              ></PublicRoute>
              <PublicRoute
                path='/login'
                authenticated={this.state.authenticated}
                component={Login}
              ></PublicRoute>
            </Switch>
          </BrowserRouter>
        )}
      </div>
    )
  }
}

export default App
