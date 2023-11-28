import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { listExamDetails } from "../actions/questionActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";

const QuizScreen = ({ history, match }) => {
  const [response, setResponse] = useState([{}]);
  const [attempts, setAttempts] = useState(0);

  const dispatch = useDispatch();
  const examDetails = useSelector((state) => state.examDetails);
  const { loading, error, exam } = examDetails;
  const [min, setMin] = useState(exam.duration - 1);
  const [sec, setSec] = useState(59);
  if (exam !== undefined && exam.time !== undefined) {
    const curdate = new Date();
    let p1 = new Intl.DateTimeFormat(["ban", "id"]).format(curdate);
    const examdate = new Date(exam.time);
    if (examdate > curdate) {
      alert("Exam not started yet!!");
      history.push("/exams");
    } else {
      let p2 = new Intl.DateTimeFormat(["ban", "id"]).format(examdate);
      let dur = parseInt(exam.duration);
      examdate.setTime(examdate.getTime() + dur * 60 * 1000);
      if (examdate < curdate) {
        alert("Exam is Over!!");
        history.push("/exams");
      }
    }
  }

  const handleChange = (e) => {
    let answer = e.target.value;
    let quesnum = e.target.name;
    var temp = 0;
    for (let i = 0; i < response.length; i++) {
      if (response[i].quesnum === quesnum) {
        response[i].answer = answer;
        temp = 1;
        break;
      }
    }
    if (temp === 0) {
      setResponse([...response, { quesnum, answer }]);
    }
  };
  const submitAnswer = async () => {
    response.shift();
    response.sort((a, b) => (a.quesnum > b.quesnum ? 1 : -1));

    let n = response.length;
    let i, j;
    let total = 0;
    let count = 0;
    let ans = [];
    for (i = 0, j = 0; i < exam.multiple.length; i++) {
      if (
        response.length > 0 &&
        j < response.length &&
        i == response[j].quesnum - "0"
      ) {
        ans.push(response[j].answer);
        j++;
      } else {
        ans.push("Not answered");
      }
    }
    let finalResponse = [{}];
    for (let i = 0; i < exam.multiple.length; i++) {
      finalResponse.push({
        question: exam.multiple[i].question,
        answer: exam.multiple[i].answer,
        marks: exam.multiple[i].marks,
        response: ans[i],
      });
    }
    finalResponse.shift();
    total = 0;

    for (let i = 0; i < exam.multiple.length; i++) {
      if (ans[i] == exam.multiple[i].answer) {
        count += exam.multiple[i].marks;
      }
      total += exam.multiple[i].marks;
    }
    const result = [count, total];

    const user = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : [];

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(attempts);
    const { data1 } = await axios.post(
      "http://127.0.0.1:5000/response",
      {
        finalResponse,
        user_id: user._id,
        name: user.name,
        exam_id: exam._id,
        attempts,
        obtain: count,
        examName: exam.title,
        total,
      },
      config
    );

    const { data2 } = await axios.post(
      "http://127.0.0.1:5000/result",
      {
        examName: exam.title,
        result,
        user_id: user._id,
        exam_id: exam._id,
      },
      config
    );
    localStorage.setItem("ResultInfo", JSON.stringify(result));

    localStorage.setItem("ResponseInfo", JSON.stringify(finalResponse));
    // history.push(`/result/${exam._id}/${user._id}`)
    history.push("/exams");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    submitAnswer();
  };
  let count = 0;
  const handleKeyDown = (event) => {
    console.log("A key was pressed", event.keyCode);
    if (event.keyCode === 17) {
      count += 1;
      setAttempts(count);
      console.log(attempts);
      alert("You tried to copy the content.It is forbidden in this Test.");
    }
  };

  const handleKeyUp = (event) => {
    console.log("A key was pressed", event.keyCode);
    if (event.keyCode === 44) {
      count += 1;
      setAttempts(count);
      console.log(attempts);
      alert("You tried to Take ScreenShot.It is forbidden in this Test.");
    }
    if (event.keyCode === 91) {
      count += 1;
      setAttempts(count);
      console.log(attempts);
      alert("You tried to Take ScreenShot.It is forbidden in this Test.");
    }
  };

  const handleClick = (ev) => {
    if (ev.which == 3) {
      count += 1;
      setAttempts(count);
      console.log(attempts);
      alert("You tried to copy the content.It is forbidden in this Test.");
    }
  };
  // lower = 725,upper = 150
  const handleOver = (e) => {
    if (e.screenY < 0 || e.screenY > 820) {
      count += 1;
      setAttempts(count);
      console.log(attempts);
      alert("Don't change tab!!");
    }
  };

  const func1 = (e) => {
    if (window.visibilityState == "visible") {
      console.log("tab is active");
    } else {
      console.log("tab is inactive");
      alert("You tried switching the tab, exam is over.")
      setMin(0);
      setSec(1);
    }
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleOver);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("visibilitychange", func1);
    return () => {
      window.removeEventListener("mousemove", handleOver);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("visibilitychange", func1);
    };
  }, []);
  React.useEffect(() => {
    if (exam.duration != undefined) {
      const t = setTimeout(() => {
        if (sec == 0) {
          setSec(59);
          setMin(min - 1);
        } else {
          setSec(sec - 1);
        }
      }, 1000);
      if (min == 0 && sec == 0 && exam.duration != undefined) {
        submitAnswer();
      }
    }
  }, [min, sec]);

  useEffect(() => {
    dispatch(listExamDetails(match.params.id));
    if (exam.duration != undefined) {
      setMin(exam.duration - 1);
      setSec(59);
    }
  }, [exam.duration]);

  return (
    <div>
      {loading || loading === undefined || exam.duration == undefined ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <br />
          <br />
          <h1 style={{ textAlign: "center" }}>
            {exam.title}
            <br /> <h4>Attempt All Questions</h4>
            <h5>Time left {`${min} : ${sec}`}</h5>
          </h1>
          <hr />
          <Form onSubmit={submitHandler}>
            {exam.multiple.map((question, number) => (
              <div style={{ margin: "2vw" }}>
                <h4>
                  {`Q.${number + 1} `}
                  {question.question}
                </h4>
                <input
                  type="radio"
                  id={`option1 ${`question${number}`}`}
                  name={`${number}`}
                  value={question.optionA}
                  onChange={handleChange}
                />
                <label for={`option1 ${`question${number}`}`}>
                  &nbsp;{`${question.optionA}`}
                </label>
                <br />
                <input
                  type="radio"
                  id={`option2 ${`question${number}`}`}
                  name={`${number}`}
                  value={question.optionB}
                  onChange={handleChange}
                />
                <label for={`option2 ${`question${number}`}`}>
                  &nbsp;{question.optionB}
                </label>
                <br />
                <input
                  type="radio"
                  id={`option3 ${`question${number}`}`}
                  name={`${number}`}
                  value={question.optionC}
                  onChange={handleChange}
                />
                <label for={`option3 ${`question${number}`}`}>
                  &nbsp;{question.optionC}
                </label>
                <br />
                <input
                  type="radio"
                  id={`option4 ${`question${number}`}`}
                  name={`${number}`}
                  value={question.optionD}
                  onChange={handleChange}
                />
                <label for={`option4 ${`question${number}`}`}>
                  &nbsp;{question.optionD}
                </label>
                <br />
              </div>
            ))}
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                variant="primary"
                style={{
                  alignItems: "center",
                  borderRadius: "2rem",
                  width: "20%",
                }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </>
      )}

      <br></br>
      <br></br>
    </div>
  );
};

export default QuizScreen;

// var countDownDate = new Date('July 24, 2021 15:00:00').getTime()
// let temp = 0
// useEffect(() => {
//   dispatch(listExamDetails(match.params.id))
//   const interval = setInterval(function () {
//     // var now = new Date().getTime()
//     // var distance = countDownDate - now
//     // var days = Math.floor(distance / (1000 * 60 * 60 * 24))
//     // var hours = Math.floor(
//     //   (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + 24 * days
//     // )
//     // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
//     // var seconds = Math.floor((distance % (1000 * 60)) / 1000)
//   //   setSec()
//   //   setMin(minutes)
//   //   if (min < 0) {
//   //     clearInterval(interval)
//   //   }
//   // }, 1000)
//   // return () => clearInterval(interval)
// }, [dispatch, match])
