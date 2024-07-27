import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/layout';
import { useAuth } from '../context/auth';

const ExamDetail = () => {
  const [auth, setAuth] = useAuth();
  const { _id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({});

  useEffect(() => {
    if (_id) getExam();
  }, [_id]);

  const getExam = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/exam/get-single-exam/${_id}`);
      setExam(data.exam);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToExam = () => {
    if (auth.user) {
      navigate(`/do-exam/${_id}`);
    } else {
      alert('You must log in to take the test.');
      navigate('/login');
    }
  };

  return (
    <Layout>
      <div className="col-md-6 exam-details-info">
        <h1 className="text-center">Exam Details</h1>
        <hr />
        <div className="text-center">
          <h6>Exam Name: {exam?.name}</h6>
          <h6>Description: {exam?.decription}</h6>
          <h6>Subject: {exam?.subject?.name}</h6>
          <h6>Access Time: {exam?.accessTime}</h6>
          <h6>Total Questions: {exam?.question?.length}</h6>
          <button className="btn btn-secondary ms-1" onClick={handleGoToExam}>
            GO TO EXAM
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ExamDetail;
