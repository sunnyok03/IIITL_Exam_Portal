import express from 'express'
const router = express.Router()
import {
  addResult,
  getResults,
  // deleteProduct,
  // createProduct,
  // updateProduct,
  // createProductReview,
  // getTopProducts,
} from '../controllers/resultController.js'

router.route('/').post(addResult)
router.route('/:id').get(getResults)
// router.route('/:id/reviews').post(protect, createProductReview)
// router.get('/top', getTopProducts)
// router
//   .route('/:id')
//   .get(getProductById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct)

export default router
