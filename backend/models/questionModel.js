import mongoose from 'mongoose'
const Schema = mongoose.Schema

var MCQ = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    optionA: {
      type: String,
      required: true,
    },
    optionB: {
      type: String,
      required: true,
    },
    optionC: {
      type: String,
      required: true,
    },
    optionD: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
)

var Numerical = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    solution: {
      type: Number,
      required: true,
    },
    marks: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
)

var Subjective = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
)

const examSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    examCode: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    creator: {
      type: String,
    },
    multiple: [MCQ],
    // numerical: [Numerical],
    // subjective: [Subjective],
  },
  {
    timestamps: true,
  }
)

var Exam = mongoose.model('Exam', examSchema)

export default Exam
