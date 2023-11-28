import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import questions from './data/Questions.js'
import cors from 'cors'
import path from 'path'
dotenv.config()
connectDB()
const app = express()

app.use(cors())

import userRoutes from './routes/userRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import responseRoutes from './routes/responseRoutes.js'
import resultRoutes from './routes/resultRoutes.js'

app.use(express.json())
app.use('/api/users', userRoutes)

app.use('/question', questionRoutes)
app.use('/response', responseRoutes)
app.use('/result', resultRoutes)

app.get('/api/questions', (req, res) => {
  res.json(questions)
})

app.get('/api/questions/:id', (req, res) => {
  const question = questions.find((p) => p._id === req.params.id)
  res.json(question)
})

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.listen(5000, console.log('Server running on port 5000'))
