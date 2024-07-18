import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Option } = Select;

const CreateQuestion = () => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState([]);
  const [type, setType] = useState([]);
  const [content, setContent] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [solution, setSolution] = useState('');
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

  useEffect(() => {
    getAllCourses();
  }, []);

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

  useEffect(() => {
    getAllSubjects();
  }, []);

  // handle create
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const questionData = new FormData();
      questionData.append('subject', subject);
      questionData.append('course', course);
      questionData.append('topic', topic);
      questionData.append('difficulty', difficulty);
      questionData.append('type', type);
      questionData.append('content', content);
      questionData.append('answer1', answer1);
      questionData.append('answer2', answer2);
      questionData.append('answer3', answer3);
      questionData.append('answer4', answer4);
      questionData.append('correctAnswer', correctAnswer);
      questionData.append('solution', solution);
      const { data } = axios.post(
        'http://localhost:8080/api/question/create-question',
        questionData,
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success('Question Created Successfully');
        navigate('/dashboard/admin/questions');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Dashboard - Create Question">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Question</h1>
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
              {subjects?.length > 0 &&
                subjects.map((subject) => (
                  <Option key={subject._id} value={subject._id}>
                    {subject.name}
                  </Option>
                ))}
            </Select>
            <div className="mb-3">
              <input
                type="text"
                value={topic}
                placeholder="Enter Topic"
                className="form-control"
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                size="large"
                placeholder="Select Difficulty"
                showSearch
                className="form-control"
                onChange={(value) => setDifficulty(value)}
              >
                <Option value="Identification">Identification</Option>
                <Option value="Understanding">Understanding</Option>
                <Option value="Applying">Applying</Option>
              </Select>
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                size="large"
                showSearch
                placeholder="Select Type"
                className="form-control"
                onChange={(value) => setType(value)}
              >
                <Option value="Choice">Choice</Option>
                <Option value="Multi-Choice">Multi-Choice</Option>
                <Option value="Text-Input">Text-Input</Option>
              </Select>
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={content}
                placeholder="Enter Content"
                className="form-control"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={answer1}
                placeholder="Enter Option 1"
                className="form-control"
                onChange={(e) => setAnswer1(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={answer2}
                placeholder="Enter Option 2"
                className="form-control"
                onChange={(e) => setAnswer2(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={answer3}
                placeholder="Enter Option 3"
                className="form-control"
                onChange={(e) => setAnswer3(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={answer4}
                placeholder="Enter Option 4"
                className="form-control"
                onChange={(e) => setAnswer4(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={correctAnswer}
                placeholder="Enter Correct Answer"
                className="form-control"
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={solution}
                placeholder="Enter Solution"
                className="form-control"
                onChange={(e) => setSolution(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                Create Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateQuestion;
