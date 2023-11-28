# IIITL EXAM An Online Examination Platform

> This platform built with the MERN stack & Redux.

## Features

- login and Sign up with proper authentication and authorization with JWT

* Faculty

  - Can add exams/quizes of MCQ
  - Can see the response of every student and the number of times students were indulge in cheating
  - Can update the questions and answer

* Student

  - Can give quizes/exams of different subject in his/her mobile or laptop
  - Can see his/her quizes/exams results in the dashboad
  - Can see his/her previous quizes/exams response

* Security for quizes/exams
  - Not allowed to change the tab
  - Not allowes to copy text
  - Not allowed to take screenshot
  - Not allowed to click right button of mouse

- Every page is made responsive as much as possible

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
