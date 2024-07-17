import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const params = useParams();
  const [courses, setCourses] = useState([]);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  //get all exams
  const getAllExams = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/exam/get-all');
      setExams(data.exams);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllExams();
  }, []);

  // get all courses
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/course/courses');
      if (data?.success) {
        setCourses(data?.courses);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <Layout title="Dashboard - All Questions">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>All Exams</h1>
          <div className="d-flex flex-wrap">
            {exams?.map((q) => (
              <div className="card m-2" style={{ width: '18rem' }}>
                <div className="card-body">
                  <Link
                    //errors
                    className="question-link"
                  >
                    <h5 className="card-title">Chủ đề: {q.name}</h5>
                    <h4 className="card-title">Khóa học: {q.course.name}</h4>
                    <p className="card-text">Thời gian làm bài: {q.time}</p>
                    <p className="card-text">Số lần làm bài: {q.accessTime}</p>
                  </Link>
                </div>
                <div className="flex-wrap" style={{ paddingLeft: '73px' }}>
                  <div className="mb-3">
                    <button className="btn btn-info ">Detail Exams</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Exams;
