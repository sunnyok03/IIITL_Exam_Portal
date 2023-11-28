import React from 'react'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import QuizScreen from './screens/QuizScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ResultScreen from './screens/ResultScreen'
import ExamScreen from './screens/ExamScreen'
import AboutScreen from './screens/AboutScreen'
import EditExamScreen from './screens/EditExamScreen'
import AddExam from './screens/AddExam'
import FacultyResponse from './screens/FacultyResponse'

function App() {
  return (
    <Router>
      <Header />
      <Route path='/' component={HomeScreen} exact />
      <Route path='/result/:id1/:id2' component={ResultScreen} exact />
      <Route path='/exams' component={ExamScreen} exact />
      <Route path='/quiz/:id' component={QuizScreen} exact />
      <Route path='/login' component={LoginScreen} exact />
      <Route path='/register' component={RegisterScreen} exact />
      <Route path='/about' component={AboutScreen} exact />
      <Route path='/edits/exam' component={EditExamScreen} exact />
      <Route path='/addexam/:id' component={AddExam} exact />
      <Route path='/response/:id' component={FacultyResponse} exact />
      <Footer />
    </Router>
  )
}

export default App
