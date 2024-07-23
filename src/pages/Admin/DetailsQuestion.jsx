import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Adminpage.css';

const DetailsQuestion = () => {
  const [question, setQuestions] = useState([]);
  const [content, setContent] = useState('');
  const [type, setType] = useState();
  const [answer, setAnswer] = useState();
  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();
  const [answer3, setAnswer3] = useState();
  const [answer4, setAnswer4] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [correctAnswer1, setCorrectAnswer1] = useState();
  const [solution, setSolution] = useState('');
  const [id, setId] = useState('');
  const { _id } = useParams();
  const [lock, setLock] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  //get single question
  //get single question
  const getSingleQuestion = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/question/get-question/${_id}`);
      setId(data.question._id);
      setType(data.question.type);
      setContent(data.question.content);
      setSolution(data.question.solution);

      if (data.question.type === 'Text-Input') {
        setCorrectAnswer(data.question.correctAnswer);
      } else if (data.question.type === 'Choice') {
        setAnswer1(data.question.answer1);
        setAnswer2(data.question.answer2);
        setAnswer3(data.question.answer3);
        setAnswer4(data.question.answer4);
        setCorrectAnswer(data.question.correctAnswer);
      } else if (data.question.type === 'Multi-Choice') {
        setAnswer(data.question.answer);
        setAnswer1(data.question.answer1);
        setAnswer2(data.question.answer2);
        setAnswer3(data.question.answer3);
        setAnswer4(data.question.answer4);
        setCorrectAnswer(data.question.correctAnswer);
        setCorrectAnswer1(data.question.correctAnswer1);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getSingleQuestion();
  }, []);

  //correct answer
  const checkAns = (e, ans) => {
    if (lock === false) {
      if (ans === correctAnswer) {
        e.target.classList.add('Correct');
        setLock(true);
      } else {
        e.target.classList.add('Wrong');
        setLock(true);
        alert(`Correct Answer is: ${correctAnswer} and here is solution: ${solution}`);
        if (correctAnswer > 0 && correctAnswer <= 4) {
          optionRefs[correctAnswer - 1].current.classList.add('Correct');
        }
      }
    } else if (type === 'Multi-Choice') {
      if (ans === correctAnswer || ans === correctAnswer1) {
        e.target.classList.add('Correct');
        setLock(true);
      } else {
        e.target.classList.add('Wrong');
        setLock(true);
        window.location.reload();
      }
    }
  };

  const checkAnsTextInput = () => {
    if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      toast.success('Correct answer!');
    } else {
      toast.error('Incorrect answer. Try again.');
      window.location.reload();
    }
  };

  return (
    <Layout title="Dashboard - Details Question">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 details-question">
          <h1>Details Question</h1>
          <hr />
          <h2>Question: {content}</h2>
          {type === 'Text-Input' ? (
            <div className="text-input">
              <input
                type="text"
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here"
                disabled={lock}
              />
              <button onClick={checkAnsTextInput} disabled={lock} className="btn btn-success">
                Submit
              </button>
            </div>
          ) : type === 'Choice' ? (
            <ul>
              <li ref={optionRefs[0]} onClick={(e) => checkAns(e, answer1)}>
                {answer1}
              </li>
              <li ref={optionRefs[1]} onClick={(e) => checkAns(e, answer2)}>
                {answer2}
              </li>
              <li ref={optionRefs[2]} onClick={(e) => checkAns(e, answer3)}>
                {answer3}
              </li>
              <li ref={optionRefs[3]} onClick={(e) => checkAns(e, answer4)}>
                {answer4}
              </li>
            </ul>
          ) : (
            <ul>
              <li ref={optionRefs[0]} onClick={(e) => checkAns(e, answer)}>
                {answer}
              </li>
              <li ref={optionRefs[1]} onClick={(e) => checkAns(e, answer1)}>
                {answer1}
              </li>
              <li ref={optionRefs[2]} onClick={(e) => checkAns(e, answer2)}>
                {answer2}
              </li>
              <li ref={optionRefs[3]} onClick={(e) => checkAns(e, answer3)}>
                {answer3}
              </li>
              <li ref={optionRefs[4]} onClick={(e) => checkAns(e, answer4)}>
                {answer4}
              </li>
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DetailsQuestion;
