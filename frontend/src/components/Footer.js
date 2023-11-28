import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; IIITL Exam</Col>
        </Row>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i
            className='fab fa-linkedin fa-2x'
            style={{ marginRight: '10px' }}
            aria-hidden='true'
          ></i>
          <i
            className='fab fa-instagram fa-2x'
            style={{ marginRight: '10px' }}
            aria-hidden='true'
          ></i>
          <i
            className='fab fa-facebook fa-2x'
            style={{ marginRight: '10px' }}
            aria-hidden='true'
          ></i>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
