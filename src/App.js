import { CircularProgress, Container } from '@material-ui/core'
import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import style from './css/App.module.css'
import Chat from './pages/Chat'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import { auth } from './services/firebase'

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} authenticated />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
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

class App extends Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      loading: true,
      displayName: '',
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
      <Container className={style.app} maxWidth='sm'>
        {this.state.loading === true ? (
          <CircularProgress className={style.spinner} />
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
      </Container>
    )
  }
}

export default App
