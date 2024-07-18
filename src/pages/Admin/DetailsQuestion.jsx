import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Adminpage.css';

const DetailsQuestion = () => {
  const params = useParams();
  const [question, setQuestions] = useState([]);
  const [content, setContent] = useState('');
  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();
  const [answer3, setAnswer3] = useState();
  const [answer4, setAnswer4] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [solution, setSolution] = useState('');
  const [id, setId] = useState('');
  const [lock, setLock] = useState(false);

  let optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  //get single question
  const getSingleQuestion = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/question/get-question/${params.slug}`,
      );
      setId(data.question._id);
      setContent(data.question.content);
      setAnswer1(data.question.answer1);
      setAnswer2(data.question.answer2);
      setAnswer3(data.question.answer3);
      setAnswer4(data.question.answer4);
      setCorrectAnswer(data.question.correctAnswer);
      setSolution(data.question.solution);
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
        </div>
      </div>
    </Layout>
  );
};

export default DetailsQuestion;
