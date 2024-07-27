import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/layout';
import axios from 'axios';
import '../styles/DoExam.css';

const DoExam = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  const handleSingleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleMultipleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionId] || [];
      if (currentAnswers.includes(answer)) {
        return {
          ...prevAnswers,
          [questionId]: currentAnswers.filter((a) => a !== answer),
        };
      } else {
        return {
          ...prevAnswers,
          [questionId]: [...currentAnswers, answer],
        };
      }
    });
  };

  const handleSubmitExam = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/exam/submit-exam/${_id}`, {
        answers,
      });
      if (response.data?.success) {
        navigate('/dashboard/student/results');
      } else {
        console.log(response.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Layout>
      <div className="col-md-8 exam-take">
        <h1 className="text-center">Take Exam: {exam?.name}</h1>
        {currentQuestion && (
          <div key={currentQuestion._id} className="question-block">
            <h5>
              Question {currentQuestionIndex + 1}: {currentQuestion.content}
            </h5>
            {currentQuestion.type === 'Text-Input' ? (
              <div className="text-input">
                <input
                  type="text"
                  onChange={(e) => handleSingleAnswerChange(currentQuestion._id, e.target.value)}
                  placeholder="Type your answer here"
                />
              </div>
            ) : currentQuestion.type === 'Multiple-Choice' ? (
              <div className="choice">
                {['answer', 'answer1', 'answer2', 'answer3', 'answer4'].map((key) => (
                  <div key={key}>
                    <input
                      type="checkbox"
                      name={`question-${currentQuestion._id}`}
                      value={currentQuestion[key]}
                      onChange={(e) =>
                        handleMultipleAnswerChange(currentQuestion._id, e.target.value)
                      }
                    />
                    {currentQuestion[key]}
                  </div>
                ))}
              </div>
            ) : (
              <div className="choice">
                {['answer1', 'answer2', 'answer3', 'answer4'].map((key) => (
                  <div key={key}>
                    <input
                      type="radio"
                      name={`question-${currentQuestion._id}`}
                      value={currentQuestion[key]}
                      onChange={(e) =>
                        handleSingleAnswerChange(currentQuestion._id, e.target.value)
                      }
                    />
                    {currentQuestion[key]}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="navigation-buttons">
          <button
            className="btn btn-secondary"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button className="btn btn-secondary" onClick={handleNextQuestion}>
              Next
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmitExam}>
              Submit Exam
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DoExam;
