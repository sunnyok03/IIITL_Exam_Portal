import express from 'express'
const router = express.Router()
import {
  addResponse,
  getResponse,
  getAllResponse,
  // deleteProduct,
  // createProduct,
  // updateProduct,
  // createProductReview,
  // getTopProducts,
} from '../controllers/responseController.js'

router.route('/').post(addResponse)
router.route('/student/:id1/:id2').get(getResponse)
router.route('/faculty/:id').get(getAllResponse)
// router.route('/:id/reviews').post(protect, createProductReview)
// router.get('/top', getTopProducts)
// router
//   .route('/:id')
//   .get(getProductById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct)

export default router
