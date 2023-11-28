import axios from 'axios'
import {
  RESULT_DETAILS_REQUEST,
  RESULT_DETAILS_SUCCESS,
  RESULT_DETAILS_FAIL,
} from '../constants/resultConstants'

export const listResults = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESULT_DETAILS_REQUEST })

    const { data } = await axios.get(`http://127.0.0.1:5000/result/${id}`)
    // console.log(data)
    dispatch({
      type: RESULT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESULT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
