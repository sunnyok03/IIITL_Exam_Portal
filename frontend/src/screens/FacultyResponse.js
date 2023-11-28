import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { allListResponse } from '../actions/responseAction'
import { Card, Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FacultyResponse = ({ history, match }) => {
  const dispatch = useDispatch()
  const allResponseDetails = useSelector((state) => state.allResponseDetails)
  const { loading, error, response } = allResponseDetails

  useEffect(() => {
    dispatch(allListResponse(match.params.id))
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
            Saved Response For Faculty
            <br />
          </h1>
          <hr />
          <Table striped bordered>
            <thead>
              <tr>
                <th>Student No.</th>
                <th>Name</th>
                <th>Marks</th>
                <th>Cheating Attempt</th>
                <th>See Response</th>
              </tr>
            </thead>
            <tbody>
              {response.map((resp, number) => (
                <tr>
                  <td>{number + 1}</td>
                  <td>{resp.name}</td>
                  <td>
                    {resp.obtain}/{resp.total}
                  </td>
                  <td>{resp.attempts}</td>
                  <td>
                    <Link to={`/result/${resp.exam}/${resp.student}`}>
                      <Button outline className='ml-auto'>
                        Response
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}

export default FacultyResponse
