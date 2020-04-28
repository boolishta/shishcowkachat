import { Button } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import { auth } from "../services/firebase"
import style from "./Header.module.css"
import Alert from "@material-ui/lab/Alert"

const Header = ({ authenticated, displayName }) => {
  const signOut = () => {
    auth()
      .signOut()
      .then()
      .catch(function (error) {
        alert(error.message)
      })
  }
  return (
    <div className={style.header}>
      <Link to='/'>HOME</Link>
      {authenticated ? (
        <div className={style.nick}>
          <span className={style.login}>Login in as </span>{" "}
          <strong> @{displayName}</strong>
          <Button variant='contained' color='primary' onClick={signOut}>
            Quit
          </Button>
        </div>
      ) : (
        <Alert severity='warning'>Log Out !!!</Alert>
      )}
    </div>
  )
}

export default Header
