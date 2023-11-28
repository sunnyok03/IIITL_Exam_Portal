import React from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import "../style.css"

const AboutScreen = () => {
  return (
    <>
      <h1 className="aboutTitle" style={{  }}>About IIITL Exam</h1>
      <div>
        <Row>
          <Image
            className='aboutImg'
            src='/images/b.jpg'
            alt='online'
            fluid
          />
        </Row>
        <Row>
          <div className='container'>
            <p className='aboutContent' style={{}}>
              IIITL Exam is an online examination system where someone can conduct
              examination for other. Recently, some institutions have used
              Google classroom to conduct online evaluation of the subjects .
              However, the approach barely worked. Google Classroom could
              accommodate assignments, but using it for online exams was a
              strenuous task. It resulted in an inefficient examination process.
              In addition to it, there was a considerable scope given to the
              students to indulge in unfair means. Hence, it will be beneficial
              to develop a safe and secure system to conduct various exams such
              as lab exams, quizzes, and other exams that support questions of
              multiple-choice.
            </p>
          </div>
        </Row>
      </div>
    </>
  )
}

export default AboutScreen
