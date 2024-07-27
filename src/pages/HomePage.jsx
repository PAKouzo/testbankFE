import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../components/Layout/layout';
import '../styles/Homepage.css';

const HomePage = () => {
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const getAllExams = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/exam/get-all`);
      setExams(data.exams);
    } catch (error) {
      console.log(error);
    }
  };
  // get all subjects
  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/subject/admin/subjects');
      if (data?.success) {
        setSubjects(data?.subjects);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllExams();
    getAllSubjects();
  }, []);

  return (
    <Layout>
      <div className="col-md-9">
        <div className="d-flex flex-wrap ">
          {exams.map((exam) => (
            <div className="col-md-3 p-1 " key={exam._id}>
              <div className="card align-items-center center">
                <div className="card-body "></div>
                <h5 className="card-title">{exam.name}</h5>
                <h4>{exam.subject ? exam.subject.name : `${subjects.name}`}</h4>
                <Link to={`/exam/${exam._id}`} className="btn btn-primary">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
