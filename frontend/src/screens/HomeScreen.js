import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import About from "./AboutScreen";
import { Media } from "react-bootstrap";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listResults } from "../actions/resultActions";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const examDetails = useSelector((state) => state.examDetails);
  const { userInfo } = userLogin;
  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : [];
  const resultDetails = useSelector((state) => state.resultDetails);
  const { loading, error, results } = resultDetails;
  const { examLoading, examError, exam } = examDetails;
  const curdate = new Date();

  let examdate = curdate;
  if (exam !== undefined && exam.time !== undefined) {
    const examdate = new Date(exam.time);
    let dur = parseInt(exam.duration);
    examdate.setTime(examdate.getTime() + dur * 60 * 1000);

    console.log(examdate);
    console.log(curdate);
  } else {
    examdate = curdate + 1;
  }
  // console

  useEffect(() => {
    if (user._id !== undefined) dispatch(listResults(user._id));
  }, []);

  return (
    <div className="container">
      {!userInfo ? (
        <div className="container" style={{ textAlign: "center" }}>
          <br></br>
          <br></br>
          <h1>IIITL Exam: An Online Examination System</h1>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      ) : (
        <div>
          <br />
          <br />
          {/* <div className='container'>
            <h1>Hi, Welcome to IIITL Exam ...</h1>
            <h3>{userInfo.name}</h3>
            <hr />
          </div> */}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div className="container">
                <h1>Your Results</h1>

                {results.map((result) => (
                  <div className="p-3 bg-secondary my-2 rounded">
                    <Toast>
                      {console.log("results ", result)}
                      <ToastHeader style={{ backgroundColor: "pink" }}>
                        Exam Title: {result.examName}
                      </ToastHeader>
                      <ToastBody>
                        Marks Obtained: {result.score}/{result.maxScore}
                        <br></br>
                        {curdate <= examdate ? (
                          <Button
                            style={{ margin: "0px" }}
                            onClick={() => alert("Let the exam end!!")}
                          >
                            Response
                          </Button>
                        ) : (
                          <Link to={`/result/${result.exam}/${result.student}`}>
                            <Button style={{ margin: "0px" }}>Response</Button>
                          </Link>
                        )}
                      </ToastBody>
                    </Toast>
                  </div>
                ))}
              </div>
              <br />
              <br />
            </>
          )}
          <br />
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
