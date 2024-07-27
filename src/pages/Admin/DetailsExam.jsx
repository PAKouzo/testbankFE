import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Adminpage.css';
import { useNavigate } from 'react-router-dom';

const DetailsExam = () => {
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [point, setPoint] = useState('');
  const [accessTime, setAccessTime] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [correctChoice, setCorrectChoice] = useState('');
  const [decription, setDecription] = useState('');
  const [accessPassword, setAccessPassword] = useState('');
  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState('');

  const navigate = useNavigate();

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
  //get all subject
  const getAllSubject = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/subject/subjects');
      if (data?.success) {
        setSubjects(data?.subjects);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllSubject();
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
  //delete
  const handleDelete = async () => {
    try {
      let answer = window.prompt('Are you sure to delete this product ? ');
      if (!answer) return;
      const { data } = await axios.delete(`http://localhost:8080/api/exam/delete-exam/${id}`);
      toast.success('Exam is deleted Succfully');
      navigate('/dashboard/admin/exams');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when deleting exam!');
    }
  };
  return (
    <Layout title="Details of exam">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Details of exam</h1>
          <div className="d-flex flex-wrap">
            {exams?.map((e) => (
              <div className="card m-2" style={{ width: '18rem' }}>
                <h5 className="card-title">Chủ đề: {e.name}</h5>
                <h4 className="card-title">
                  Môn Học: {e.subject ? e.subject.name : `${subjects.name}`}
                </h4>
                <h4 className="card-title">
                  Khóa học: {e.course ? e.course.name : `${courses.name}`}
                </h4>
                <p className="card-text">Thời gian làm bài: {e.time} p</p>
                <p className="card-text">Số lần làm bài: {e.accessTime}</p>
                <p className="card-text">Số điểm tối đa: {e.point}</p>
                <p className="card-text">
                  Thời gian tạo bài test: {new Date(e.createdAt).toLocaleString(`en-US`)}
                </p>
                <p className="card-text">Hạn bài test: {e.timeEnd}</p>
                <p className="card-text">
                  Tổng số câu đúng để vượt qua bài test: {e.correctChoice}
                </p>
                <p className="card-text">Mô tả: {e.decription}</p>
                <p className="card-text">Mật khẩu: {e.accessPassword}</p>
                <p className="card-text">Câu hỏi: {e.question}</p>
                <div className="mb-3">
                  <button
                    className="btn btn-success"
                    onClick={navigate(`/dashboard/admin/exam/${e._id}`)}
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailsExam;
