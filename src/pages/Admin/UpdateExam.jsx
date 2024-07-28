import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const { Option } = Select;
const UpdateExam = () => {
  const [courses, setCourses] = useState([]);
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [course, setCourse] = useState('');
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [point, setPoint] = useState('');
  const [decription, setDecription] = useState('');
  const [correctChoice, setCorrectChoice] = useState('');
  const [question, setQuestion] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(['']);
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [id, setId] = useState('');

  const [exams, setExams] = useState([]);

  const navigate = useNavigate();
  const { _id } = useParams();
  // get all courses
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/course/admin/courses');
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
      const { data } = await axios.get('http://localhost:8080/api/subject/admin/subjects');
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

  const getSingleExam = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/exam/get-single-exam/${_id}`);
      setId(data.exam._id);
      setCourse(data.exam.course._id);
      setSubject(data.exam.subject._id);
      setName(data.exam.name);
      setTime(data.exam.time);
      setPoint(data.exam.point);
      setTimeEnd(data.exam.timeEnd);
      setCorrectChoice(data.exam.correctChoice);
      setDecription(data.exam.decription);
      setQuestion(data.exam.question);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when getting exam by id!');
      toast.error(error);
    }
  };
  useEffect(() => {
    getSingleExam();
  }, [_id]);

  useEffect(() => {
    getAllCourses();
    getAllSubjects();
    getAllQuestion();
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
  const handleDateChange = (date) => {
    setTimeEnd(date);
  };
  //create
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const examData = new FormData();
      examData.append('course', course);
      examData.append('subject', subject);
      examData.append('name', name);
      examData.append('time', time);
      examData.append('point', point);
      examData.append('timeEnd', timeEnd.toISOString());
      examData.append('correctChoice', correctChoice);
      examData.append('decription', decription);
      examData.append('question', JSON.stringify(questions));

      const { data } = await axios.put(
        `http://localhost:8080/api/exam/admin/update-exam/${_id}`,
        examData,
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success('Exam Updated Successfully');
        navigate('/dashboard/admin/exams');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when updating exam!');
    }
  };

  return (
    <Layout title="Dashboard - Create Exam">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Update Exam</h1>
          <div className="m-1 w-75">
            <h5>Select course</h5>
            <Select
              bordered={false}
              placeholder="Select Course"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setCourse(value)}
              value={course}
            >
              {courses?.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.name}
                </Option>
              ))}
            </Select>
            <h5>Select subject</h5>
            <Select
              bordered={false}
              placeholder="Select Subjects"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setSubject(value)}
              value={subject}
            >
              {subjects?.map((subject) => (
                <Option key={subject._id} value={subject._id}>
                  {subject.name}
                </Option>
              ))}
            </Select>
            <h5>Tên bài kiểm tra</h5>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <h5>Thời gian làm bài</h5>
            <div className="mb-3">
              <input
                type="text"
                value={time}
                placeholder="Thời gian làm bài"
                className="form-control"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <h5>Hạn bài kiểm tra</h5>
            <div className="mb-3">
              <p>Chọn ngày hết hạn</p>
              <DatePicker selected={timeEnd} onChange={handleDateChange} />
            </div>
            <h5>Tổng số điểm bài kiểm tra</h5>
            <div className="mb-3">
              <input
                type="text"
                value={point}
                placeholder="Point"
                className="form-control"
                onChange={(e) => setPoint(e.target.value)}
              />
            </div>
            <h5>Số lần làm bài kiểm tra.</h5>
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
                value={correctChoice}
                placeholder="Số câu trả lời đúng để pass test"
                className="form-control"
                onChange={(e) => setCorrectChoice(e.target.value)}
              />
            </div>
            <div className="add-question mb-3">
              <h4>Thêm câu hỏi:</h4>
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
                Add Available Questions
              </button>
            </div>
            <div className="mb-3">
              <h4>Câu hỏi trong bài kiểm tra:</h4>
              <div className="row">
                {question.map((q, index) => (
                  <div key={q._id || index} className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Câu hỏi {index + 1}</h5>
                        <p className="card-text">{q.content}</p>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setQuestion((prev) => prev.filter((_, i) => i !== index))}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
