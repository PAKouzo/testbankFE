import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/layout';
import axios from 'axios';
import { Checkbox } from 'antd';
import '../styles/DoExam.css';

const DoExam = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);
  const timerRef = useRef(null);

  const getExam = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/exam/get-single-exam/${_id}`);
      setExam(data?.exam);
      setQuestions(data?.exam?.question || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExam();
  }, [_id]);

  useEffect(() => {
    if (remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleSubmitExam();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [remainingTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleAnswerChange = (questionId, answer) => {};

  return (
    <Layout>
      <div className="col-md-8 exam-take">
        <h1 className="text-center">Take Exam: {exam?.name}</h1>
        <div className="timer">
          <h4>Time Remaining: {formatTime(remainingTime)}</h4>
        </div>
        <hr />
        {questions.map((question, index) => (
          <div key={question._id} className="question-block">
            <h5>
              Question {index + 1}: {question.content}
            </h5>
            {question.type === 'Text-Input' ? (
              <div className="text-input">
                <input
                  type="text"
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  placeholder="Type your answer here"
                />
              </div>
            ) : (
              <div className="choice">
                <Checkbox
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  value={question.answer1}
                >
                  {question.answer1}
                </Checkbox>
                <Checkbox
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  value={question.answer2}
                >
                  {question.answer2}
                </Checkbox>
                <Checkbox
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  value={question.answer3}
                >
                  {question.answer3}
                </Checkbox>
                <Checkbox
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  value={question.answer4}
                >
                  {question.answer4}
                </Checkbox>
              </div>
            )}
          </div>
        ))}

        <button className="btn btn-primary">Submit Exam</button>
      </div>
    </Layout>
  );
};

export default DoExam;
