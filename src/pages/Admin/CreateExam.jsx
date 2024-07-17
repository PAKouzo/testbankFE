import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Option } = Select;

const CreateExam = () => {
  const [courses, setCourses] = useState([]);
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [course, setCourse] = useState('');
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [point, setPoint] = useState('');
  const [accessTime, setAccessTime] = useState('');
  const [decription, setDecription] = useState('');
  const [accessPassword, setAccessPassword] = useState('');
  const [correctChoice, setCorrectChoice] = useState('');
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');

  const navigate = useNavigate();

  // get all courses
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/course/courses');
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/subject/subjects');
      if (data.success) {
        setSubjects(data.subjects);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const getAllQuestion = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/question/get-questions');
      if (data.success) {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllCourses();
    getAllSubjects();
    getAllQuestion();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const examData = new FormData();
      examData.append('subject', subject);
      examData.append('course', course);
      examData.append('name', name);
      examData.append('time', time);
      examData.append('point', point);
      examData.append('accessTime', accessTime);
      examData.append('decription', decription);
      examData.append('accessPassword', accessPassword);
      examData.append('correctChoice', correctChoice);
      examData.append('question', question);

      const { data } = axios.post('http://localhost:8080/api/exam/create-exam', examData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success('Exam Created Successfully');
        navigate('/dashboard/admin/exams');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Dashboard - Create Exam">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Exam</h1>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select Course Or Grade Level"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setCourse(value)}
            >
              {courses?.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.name}
                </Option>
              ))}
            </Select>
            <Select
              bordered={false}
              placeholder="Select Subjects"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setSubject(value)}
            >
              {subjects?.map((subject) => (
                <Option key={subject._id} value={subject._id}>
                  {subject.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={time}
                placeholder="Thời gian làm bài"
                className="form-control"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={point}
                placeholder="Point"
                className="form-control"
                onChange={(e) => setPoint(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={accessTime}
                placeholder="Số lần làm bài"
                className="form-control"
                onChange={(e) => setAccessTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={decription}
                placeholder="Mô tả"
                className="form-control"
                onChange={(e) => setDecription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={accessPassword}
                placeholder="Password"
                className="form-control"
                onChange={(e) => setAccessPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={correctChoice}
                placeholder="Số câu trả lời đúng để pass test"
                className="form-control"
                onChange={(e) => setCorrectChoice(e.target.value)}
              />
            </div>
            <Select
              bordered={false}
              placeholder="Select Questions"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setQuestion(value)}
            >
              {questions?.map((question) => (
                <Option key={question._id} value={question._id}>
                  {question.content}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                Create Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateExam;
