import mongoose from 'mongoose'
const Schema = mongoose.Schema

var MCQ = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
})

var Numerical = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
})

var Subjective = new Schema({
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
})

const responseScema = new Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    examName: {
      type: String,
      required: true,
    },
    attempts: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      required: true,
    },
    obtain: {
      type: Number,
      required: true,
    },
    multiple: [MCQ],
    // numerical: [Numerical],
    // subjective: [Subjective]
  },
  {
    timestamps: true,
  }
)

var Response = mongoose.model('Response', responseScema)

export default Response
