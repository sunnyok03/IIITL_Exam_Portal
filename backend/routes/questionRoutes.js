import express from 'express'
const router = express.Router()
import {
  registerExam,
  getExam,
  getExamById,
  setQues,
  deleteExam,
} from '../controllers/questionController.js'

router.route('/').post(registerExam)
router.route('/setques/:id').post(setQues)
router.route('/activexam').get(getExam)
router.route('/activexam/:id').get(getExamById)

router
  .route('/:id')
  // .get(getProductById)
  .delete(deleteExam)
// .put(protect, admin, updateProduct)

export default router
