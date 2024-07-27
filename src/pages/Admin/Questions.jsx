import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Questions = () => {
  const [question, setQuestions] = useState([]);
  const params = useParams();
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  //get all questions
  const getAllQuestions = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/question/get-questions');
      setQuestions(data.questions);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  // get all courses
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/course/admin/courses');
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
    getAllSubjects();
  }, []);

  return (
    <Layout title="Dashboard - All Questions">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>All Questions</h1>
          <div className="d-flex flex-wrap">
            {question?.map((q) => (
              <div className="card m-2" style={{ width: '18rem' }}>
                <div className="card-body">
                  <Link
                    key={q._id}
                    to={`/dashboard/admin/question/${q._id}`}
                    className="question-link"
                  >
                    <h5 className="card-title">
                      Môn học: {q.subject ? q.subject.name : `${subjects.name}`}
                    </h5>
                    <h4 className="card-title">
                      Khóa học: {q.course ? q.course.name : `${courses.name}`}
                    </h4>
                    <p className="card-text">Chủ đề: {q.topic}</p>
                    <p className="card-text">Câu hỏi: {q.content}</p>
                  </Link>
                </div>
                <div className="flex-wrap" style={{ paddingLeft: '73px' }}>
                  <div className="mb-3">
                    <button
                      className="btn btn-info "
                      onClick={() => navigate(`/dashboard/admin/detail-question/${q._id}`)}
                    >
                      Detail Question
                    </button>
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

export default Questions;
