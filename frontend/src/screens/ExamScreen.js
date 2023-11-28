import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { listExams } from '../actions/questionActions'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const EditExamScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [examCode, setExamCode] = useState('')
  const [instructions, setInstructions] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState('')
  const dispatch = useDispatch()
  const examList = useSelector((state) => state.examList)
  const { loading, error, exams } = examList
  localStorage.removeItem('ResponseInfo')
  localStorage.removeItem('ResultInfo')

  function handleShow() {
    setShow(true)
  }
  const faculty = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : []
  async function handleSubmit(e) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const creator = faculty.name
    const { data } = await axios.post(
      '/question',
      {
        title,
        examCode,
        time,
        duration,
        instructions,
        creator,
      },
      config
    )
  }

  useEffect(async () => {
    dispatch(listExams())
  }, [])
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} autoComplete='Off'>
            <Form.Group controlId='title'>
              <Form.Label>Exam Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Exam Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='examCode'>
              <Form.Label>Exam Code</Form.Label>
              <Form.Control
                type='text'
                placeholder='Exam Code'
                value={examCode}
                onChange={(e) => setExamCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='examDate'>
              <Form.Label>Exam Date</Form.Label>
              <Form.Control
                type='datetime-local'
                placeholder='Small text'
                value={time}
                onChange={(e) => setTime(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='examDuration'>
              <Form.Label>Exam Duration</Form.Label>
              <Form.Control
                type='Number'
                placeholder='120 (in minutes)'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='instructions'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Description'
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className='container'>
        <br></br>
        <br></br>
        <br></br>
        <Row>
          <Col>
            <h3>Active Exam Papers</h3>
            <hr />
            <br></br>
          </Col>
          {faculty.isAdmin ? (
            <div className='ml-auto'>
              <Link to='/edits/exam'>
                <Button outline className='ml-auto' onClick={handleShow}>
                  <span className='fa fa-pencil fa-lg'></span>Edit Exam papers
                </Button>
              </Link>
            </div>
          ) : (
            <div className='ml-auto'>
              <Button
                outline
                className='ml-auto'
                onClick={() => {
                  alert('You are not an admin')
                }}
              >
                <span className='fa fa-pencil fa-lg'></span>Edit Exam papers
              </Button>
            </div>
          )}
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {exams !== undefined &&
                exams.map((exam) => (
                  <Col sm={12} md={6} lg={6} xl={6}>
                    <Card
                      body
                      inverse
                      style={{
                        // width: '20rem','#ABA5CF'
                        backgroundColor: '#6c61ff',
                        borderRadius: '5%',
                        borderWidth: '5px',
                        color: 'white',
                        margin: '5%',
                        fontSize: '20px',
                      }}
                    >
                      <Card.Body>
                        <Card.Title>
                          <p>Subject: {exam.title}</p>
                        </Card.Title>
                        <Card.Text>Course Code: {exam.examCode}</Card.Text>
                        <Card.Text>Exam Date: {exam.time}</Card.Text>
                        <Card.Text>Duration: {exam.duration} minutes</Card.Text>
                        <Card.Text>Description: {exam.instructions}</Card.Text>
                        {userInfo ? (
                          <Link to={`/quiz/${exam._id}`}>
                            <Button
                              variant='light'
                              style={{
                                borderRadius: '10px',
                                fontSize: '19px',
                                margin: '1rem',
                                color: 'black',
                              }}
                              id='quiz'
                            >
                              Start
                            </Button>
                          </Link>
                        ) : (
                          <Link to='/login'>
                            <Button
                              variant='light'
                              style={{
                                borderRadius: '10px',
                                fontSize: '19px',
                                margin: '1rem',
                                color: 'black',
                              }}
                            >
                              Start
                            </Button>
                          </Link>
                        )}
                        {faculty.isAdmin ? (
                          <Link to={`/response/${exam._id}`}>
                            <Button
                              variant='light'
                              style={{
                                borderRadius: '10px',
                                fontSize: '19px',
                                margin: '1rem',
                                color: 'black',
                              }}
                            >
                              Response
                            </Button>
                          </Link>
                        ) : (
                          <></>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </>
        )}

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  )
}

export default EditExamScreen
