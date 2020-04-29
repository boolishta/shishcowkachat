import { Button, Paper, SvgIcon, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../services/firebase'
import style from '../css/Header.module.css'
import Alert from '@material-ui/lab/Alert'
import HomeIcon from '@material-ui/icons/Home'

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
    <Paper elevation={3} className={style.header}>
      <Link to='/'>
        <SvgIcon component={HomeIcon} fontSize='large'></SvgIcon>
      </Link>
      {authenticated ? (
        <Typography className={style.nick}>
          <strong> @{displayName}</strong>
          <Button variant='contained' color='primary' onClick={signOut}>
            Quit
          </Button>
        </Typography>
      ) : (
        <Alert severity='warning'>Log Out !!!</Alert>
      )}
    </Paper>
  )
}

export default Header
