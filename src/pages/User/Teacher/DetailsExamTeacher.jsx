import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/layout';
import TeacherMenu from '../../../components/Layout/TeacherMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DetailsExamTeacher = () => {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [examDetails, setExamDetails] = useState({
    name: '',
    time: '',
    point: '',
    timeEnd: '',
    correctChoice: '',
    decription: '',
    subject: '',
    course: '',
    createdAt: '',
    question: '',
  });
  const { _id } = useParams();
  const navigate = useNavigate();

  const getSingleExam = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/exam/get-single-exam/${_id}`);
      setExamDetails(data.exam);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when getting exam by id!');
    }
  };
  useEffect(() => {
    getSingleExam();
  }, [_id]);
  //get all subject
  const getAllSubject = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/subject/teacher/subjects');
      if (data?.success) {
        setSubjects(data?.subjects);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when getting all subjects');
    }
  };

  useEffect(() => {
    getAllSubject();
  }, []);

  // get all courses
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/course/teacher/courses');
      if (data?.success) {
        setCourses(data?.courses);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when getting all courses');
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);
  //delete
  const handleDelete = async () => {
    try {
      let answer = window.prompt('Are you sure to delete this product ? ');
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/exam/teacher/delete-exam/${_id}`,
      );
      toast.success('Exam is deleted Succfully');
      navigate('/dashboard/teacher/exams');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when deleting exam!');
    }
  };
  return (
    <Layout title="Details of exam">
      <div className="row">
        <div className="col-md-3">
          <TeacherMenu />
        </div>
        <div className="col-md-9">
          <h1>Details of exam</h1>
          <div className="d-flex flex-wrap">
            <div className="card m-2" style={{ width: '18rem' }}>
              <h5 className="card-title">Chủ đề: {examDetails.name}</h5>
              <h4 className="card-title">
                Môn Học: {examDetails.subject ? examDetails.subject.name : `${subjects.name}`}
              </h4>
              <h4 className="card-title">
                Khóa học: {examDetails.course ? examDetails.course.name : `${courses.name}`}
              </h4>
              <p className="card-text">Thời gian làm bài: {examDetails.time} p</p>
              <p className="card-text">Số điểm tối đa: {examDetails.point}</p>
              <p className="card-text">
                Thời gian tạo bài test: {new Date(examDetails.createdAt).toLocaleString(`en-US`)}
              </p>
              <p className="card-text">Hạn bài test: {examDetails.timeEnd}</p>
              <p className="card-text">
                Tổng số câu đúng để vượt qua bài test: {examDetails.correctChoice}
              </p>
              <p className="card-text">Mô tả: {examDetails.decription}</p>
              <p className="card-text">Câu hỏi: {examDetails.question.content}</p>
              <div className="mb-3">
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/dashboard/teacher/exam/${_id}`)}
                >
                  Update Exam
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailsExamTeacher;
