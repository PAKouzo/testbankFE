import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Option } = Select;
const UpdateExam = () => {
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
  const [question, setQuestion] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(['']);
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [exams, setExams] = useState([]);

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

  // get all subjects
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

  // get all questions
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
    getAllCourses();
    getAllSubjects();
    getAllQuestion();
    getAllExams();
  }, []);

  const handleAddOption = () => {
    setSelectedQuestions([...selectedQuestions, '']);
  };

  const handleRemoveOption = (index) => {
    const updatedQuestions = selectedQuestions.filter((_, i) => i !== index);
    setSelectedQuestions(updatedQuestions);
  };

  const handleQuestionChange = (value, index) => {
    const updatedQuestions = [...selectedQuestions];
    updatedQuestions[index] = value;
    setSelectedQuestions(updatedQuestions);
  };

  //create
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (selectedQuestions.length === 0 || !selectedQuestions[0]) {
      toast.error('Please select at least one question');
      return;
    }
    try {
      const examData = {
        subject,
        course,
        name,
        time,
        timeStart,
        timeEnd,
        point,
        accessTime,
        decription,
        accessPassword,
        correctChoice,
        question: selectedQuestions,
      };

      const { data } = await axios.put('http://localhost:8080/api/exam/create-exam', examData);
      if (data?.success) {
        toast.success('Exam Created Successfully');
        navigate('/dashboard/admin/exams');
      } else {
        toast.error(data?.message);
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
                value={timeStart}
                placeholder="Thời gian bắt đầu"
                className="form-control"
                onChange={(e) => setTimeStart(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={timeEnd}
                placeholder="Thời gian kết thúc"
                className="form-control"
                onChange={(e) => setTimeEnd(e.target.value)}
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
            <div className="add-question">
              {selectedQuestions.map((selectedQuestion, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Questions"
                    size="large"
                    showSearch
                    className="form-select"
                    onChange={(value) => handleQuestionChange(value, index)}
                    value={selectedQuestion}
                  >
                    {questions?.map((question) => (
                      <Option key={question._id} value={question._id}>
                        {question.content}
                      </Option>
                    ))}
                  </Select>
                  <button onClick={() => handleRemoveOption(index)} className="btn btn-danger ms-2">
                    X
                  </button>
                </div>
              ))}
              <button onClick={handleAddOption} className="btn btn-primary mb-2">
                Add Question
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-success" onClick={handleUpdate}>
                Update Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateExam;
