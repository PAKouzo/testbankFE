import React, { useEffect, useState } from 'react';
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
  const [answer, setAnswer] = useState(null);
  const [answers, setAnswers] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [solution, setSolution] = useState('');
  const [id, setId] = useState('');

  //get single question
  const getSingleQuestion = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/question/get-question/${params.slug}`,
      );
      setId(data.question._id);
      setContent(data.question.content);
      setAnswers(data.question.answers);
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

  return (
    <Layout title="Dashboard - Details Question">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 details-question">
          <h1>Details Question</h1>
          <h5 className="card-title">Question: {content}</h5>
          <h4>Choice: {answers}</h4>
          <h4 className="correct-answer">Correct Answer: {correctAnswer}</h4>
          <h4 className="solution">Solution: {solution}</h4>
        </div>
      </div>
    </Layout>
  );
};

export default DetailsQuestion;
