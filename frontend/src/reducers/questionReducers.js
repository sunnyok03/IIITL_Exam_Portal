import {
  EXAM_LIST_REQUEST,
  EXAM_LIST_SUCCESS,
  EXAM_LIST_FAIL,
  EXAM_DETAILS_REQUEST,
  EXAM_DETAILS_SUCCESS,
  EXAM_DETAILS_FAIL,
  EXAM_DELETE_REQUEST,
  EXAM_DELETE_SUCCESS,
  EXAM_DELETE_FAIL,
  EXAM_CREATE_RESET,
  EXAM_CREATE_FAIL,
  EXAM_CREATE_SUCCESS,
  EXAM_CREATE_REQUEST,
  EXAM_UPDATE_REQUEST,
  EXAM_UPDATE_SUCCESS,
  EXAM_UPDATE_FAIL,
  EXAM_UPDATE_RESET,
  EXAM_CREATE_REVIEW_REQUEST,
  EXAM_CREATE_REVIEW_SUCCESS,
  EXAM_CREATE_REVIEW_FAIL,
  EXAM_CREATE_REVIEW_RESET,
  EXAM_TOP_REQUEST,
  EXAM_TOP_SUCCESS,
  EXAM_TOP_FAIL,
} from '../constants/questionConstants'

export const examListReducer = (state = { exams: [] }, action) => {
  switch (action.type) {
    case EXAM_LIST_REQUEST:
      return { loading: true, exams: [] }
    case EXAM_LIST_SUCCESS:
      return {
        loading: false,
        exams: action.payload,
      }
    case EXAM_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const questionDetailsReducer = (state = { exam1: [] }, action) => {
  switch (action.type) {
    case EXAM_LIST_REQUEST:
      return { loading1: true, exam1: [] }
    case EXAM_LIST_SUCCESS:
      return {
        loading1: false,
        exam1: action.payload,
      }
    case EXAM_LIST_FAIL:
      return { loading1: false, error1: action.payload }
    default:
      return state
  }
}

export const examDetailsReducer = (state = { exam: {} }, action) => {
  switch (action.type) {
    case EXAM_DETAILS_REQUEST:
      return { ...state, loading: true }
    case EXAM_DETAILS_SUCCESS:
      return { loading: false, exam: action.payload }
    case EXAM_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// export const productDeleteReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_DELETE_REQUEST:
//       return { loading: true }
//     case PRODUCT_DELETE_SUCCESS:
//       return { loading: false, success: true }
//     case PRODUCT_DELETE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

// export const productCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_CREATE_REQUEST:
//       return { loading: true }
//     case PRODUCT_CREATE_SUCCESS:
//       return { loading: false, success: true, product: action.payload }
//     case PRODUCT_CREATE_FAIL:
//       return { loading: false, error: action.payload }
//     case PRODUCT_CREATE_RESET:
//       return {}
//     default:
//       return state
//   }
// }

// export const productUpdateReducer = (state = { product: {} }, action) => {
//   switch (action.type) {
//     case PRODUCT_UPDATE_REQUEST:
//       return { loading: true }
//     case PRODUCT_UPDATE_SUCCESS:
//       return { loading: false, success: true, product: action.payload }
//     case PRODUCT_UPDATE_FAIL:
//       return { loading: false, error: action.payload }
//     case PRODUCT_UPDATE_RESET:
//       return { product: {} }
//     default:
//       return state
//   }
// }

// export const productReviewCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_CREATE_REVIEW_REQUEST:
//       return { loading: true }
//     case PRODUCT_CREATE_REVIEW_SUCCESS:
//       return { loading: false, success: true }
//     case PRODUCT_CREATE_REVIEW_FAIL:
//       return { loading: false, error: action.payload }
//     case PRODUCT_CREATE_REVIEW_RESET:
//       return {}
//     default:
//       return state
//   }
// }

// export const productTopRatedReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_TOP_REQUEST:
//       return { loading: true, products: [] }
//     case PRODUCT_TOP_SUCCESS:
//       return { loading: false, products: action.payload }
//     case PRODUCT_TOP_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }
