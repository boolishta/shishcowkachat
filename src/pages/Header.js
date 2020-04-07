import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { auth } from '../services/firebase';
import style from './Header.module.css'

const Header = ({authenticated, displayName}) => {
  const signOut = () => {
    auth().signOut()
      .then()
      .catch(function (error) {
        alert(error.message)
      })
  }
  return (
    <Container>
      <Row className={style.header}>
        <Col >
          <Link to="/">Shishcowka Chat</Link>
        </Col>
          { authenticated
            ? <Col className={style.nick}><span className={style.login}>Login in as </span> <strong> @{displayName}</strong>
                <Button onClick= {signOut}>Quit</Button>
              </Col>
            : <Col xs={4} md={3}>
              <Alert variant="danger" className={style.nickAlert}>Log Out !!!</Alert>
            </Col> }        
      </Row>
    </Container>
  )
}

export default Header;