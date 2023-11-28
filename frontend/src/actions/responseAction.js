import axios from 'axios'
import {
  RESPONSE_DETAILS_REQUEST,
  RESPONSE_DETAILS_SUCCESS,
  RESPONSE_DETAILS_FAIL,
  ALL_RESPONSE_DETAILS_REQUEST,
  ALL_RESPONSE_DETAILS_SUCCESS,
  ALL_RESPONSE_DETAILS_FAIL,
} from '../constants/responseConstants'

export const listResponse = (id1, id2) => async (dispatch) => {
  try {
    dispatch({ type: RESPONSE_DETAILS_REQUEST })

    const { data } = await axios.get(
      `http://127.0.0.1:5000/response/student/${id1}/${id2}`
    )
    // console.log(data)
    dispatch({
      type: RESPONSE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESPONSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const allListResponse = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_RESPONSE_DETAILS_REQUEST })

    const { data } = await axios.get(
      `http://127.0.0.1:5000/response/faculty/${id}`
    )
    // console.log(data)
    dispatch({
      type: ALL_RESPONSE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_RESPONSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
