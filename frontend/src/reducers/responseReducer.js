import {
  RESPONSE_DETAILS_REQUEST,
  RESPONSE_DETAILS_SUCCESS,
  RESPONSE_DETAILS_FAIL,
  ALL_RESPONSE_DETAILS_REQUEST,
  ALL_RESPONSE_DETAILS_SUCCESS,
  ALL_RESPONSE_DETAILS_FAIL,
} from '../constants/responseConstants'

export const responseDetailReducer = (state = { response: [] }, action) => {
  switch (action.type) {
    case RESPONSE_DETAILS_REQUEST:
      return { loading: true, response: [] }
    case RESPONSE_DETAILS_SUCCESS:
      return {
        loading: false,
        response: action.payload,
      }
    case RESPONSE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const allResponseDetailReducer = (state = { response: [] }, action) => {
  switch (action.type) {
    case ALL_RESPONSE_DETAILS_REQUEST:
      return { loading: true, response: [] }
    case ALL_RESPONSE_DETAILS_SUCCESS:
      return {
        loading: false,
        response: action.payload,
      }
    case ALL_RESPONSE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//   export const questionDetailsReducer = (state = { exam1: [] }, action) => {
//     switch (action.type) {
//       case EXAM_LIST_REQUEST:
//         return { loading1: true, exam1: [] }
//       case EXAM_LIST_SUCCESS:
//         return {
//           loading1: false,
//           exam1: action.payload,
//         }
//       case EXAM_LIST_FAIL:
//         return { loading1: false, error1: action.payload }
//       default:
//         return state
//     }
//   }

//   export const examDetailsReducer = (state = { exam: {} }, action) => {
//     switch (action.type) {
//       case EXAM_DETAILS_REQUEST:
//         return { ...state, loading: true }
//       case EXAM_DETAILS_SUCCESS:
//         return { loading: false, exam: action.payload }
//       case EXAM_DETAILS_FAIL:
//         return { loading: false, error: action.payload }
//       default:
//         return state
//     }
//   }
