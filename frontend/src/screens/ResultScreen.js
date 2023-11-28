import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listResponse } from '../actions/responseAction'

const ResultScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const responseDetails = useSelector((state) => state.responseDetails)
  const { loading, error, response } = responseDetails

  useEffect(() => {
    dispatch(listResponse(match.params.id1, match.params.id2))
  }, [dispatch, match])

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : response.length === 0 ? (
        <Loader />
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>
            {response[0].examName} Quiz Response
            <br />
            <h4>
              Score: {response[0].obtain}/{response[0].total}
            </h4>
          </h1>
          <hr />
          <Table striped bordered>
            <thead>
              <tr>
                <th>Q.No</th>
                <th>Question</th>
                <th>Marks</th>
                <th>Correct Answer</th>
                <th>Your Answer</th>
              </tr>
            </thead>
            <tbody>
              {response[0].multiple.map((question, number) => (
                <tr>
                  <td>{number + 1}</td>
                  <td>{question.question}</td>
                  <td>{question.marks}</td>
                  <td>{question.answer}</td>
                  <td>{question.response}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}

export default ResultScreen
