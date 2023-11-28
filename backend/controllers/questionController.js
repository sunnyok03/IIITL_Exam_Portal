import asyncHandler from 'express-async-handler'
import Exam from '../models/questionModel.js'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerExam = asyncHandler(async (req, res) => {
  const { title, examCode, instructions, time, faculty, duration } = req.body

  const examExists = await Exam.findOne({ examCode })

  if (examExists) {
    res.status(400)
    throw new Error('Course already exists')
  }

  const exam = await Exam.create({
    title,
    examCode,
    instructions,
    time,
    faculty,
    duration,
  })

  if (exam) {
    res.status(201).json({
      _id: exam._id,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const setQues = asyncHandler(async (req, res) => {
  const { multiple } = req.body

  const exam = await Exam.findById(req.params.id)

  if (exam) {
    exam.multiple.push(multiple)

    const updatedExam = await exam.save()
    res.json(updatedExam)
  } else {
    res.status(404)
    throw new Error('Exam not found')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getExam = asyncHandler(async (req, res) => {
  const exams = await Exam.find({})
  res.json(exams)
})

const getExamById = asyncHandler(async (req, res) => {
  // console.log(req.params.id)
  const exam = await Exam.findById(req.params.id)

  if (exam) {
    res.json(exam)
  } else {
    res.status(404)
    throw new Error('Exam not found')
  }
})

const deleteExam = asyncHandler(async (req, res) => {
  const product = await Exam.deleteOne({ _id: req.params.id })

  if (product) {
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  registerExam,
  getExam,
  getExamById,
  setQues,
  deleteExam,
  // updateUserProfile,
  // getUsers,
  // deleteUser,
  // getUserById,
  // updateUser,
}
