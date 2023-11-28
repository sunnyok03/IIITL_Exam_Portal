import mongoose from 'mongoose'
const Schema = mongoose.Schema

var resultSchema = new Schema(
  {
    examName: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    maxScore: {
      type: Number,
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

var Results = mongoose.model('Result', resultSchema)

export default Results
