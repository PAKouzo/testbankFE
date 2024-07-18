import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const { Option } = Select;

const UpdateQuestion = () => {
  const params = useParams();
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState([]);
  const [type, setType] = useState([]);
  const [content, setContent] = useState('');
  const [answer, setAnswer] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [solution, setSolution] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();

  //get single question
  const getSingleQuestion = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/question/get-question/${params.slug}`,
      );
      setId(data.question._id);
      setCourse(data.question.course._id);
      setSubject(data.question.subject._id);
      setTopic(data.question.topic);
      setDifficulty(data.question.difficulty);
      setType(data.question.type);
      setContent(data.question.content);
      setSolution(data.question.solution);
      if (data.question.type === 'Text-Input') {
        setAnswer(data.question.answer);
      } else if (data.question.type === 'Choice' || data.question.type === 'Multi-Choice') {
        setAnswer1(data.question.answer1);
        setAnswer2(data.question.answer2);
        setAnswer3(data.question.answer3);
        setAnswer4(data.question.answer4);
      }
      setCorrectAnswer(data.question.correctAnswer);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getSingleQuestion();
  }, []);

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

  //update question
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const questionData = new FormData();
      questionData.append('course', course);
      questionData.append('subject', subject);
      questionData.append('topic', topic);
      questionData.append('difficulty', difficulty);
      questionData.append('type', type);
      questionData.append('content', content);
      questionData.append('solution', solution);
      if (type === 'Text-Input') {
        questionData.answer = answer;
        questionData.correctAnswer = correctAnswer;
      } else if (type === 'Choice' || type === 'Multi-Choice') {
        questionData.answer1 = answer1;
        questionData.answer2 = answer2;
        questionData.answer3 = answer3;
        questionData.answer4 = answer4;
        questionData.correctAnswer = correctAnswer;
      }
      const { data } = axios.put(
        `http://localhost:8080/api/question/update-question/${id}`,
        questionData,
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success('Question Updated Successfully');
        navigate('/dashboard/admin/questions');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  //delete question
  const handleDelete = async () => {
    try {
      let answer = window.prompt('Are you sure to delete this product ? ');
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/question/delete-question/${id}`,
      );
      toast.success('Product Deleted Succfully');
      navigate('/dashboard/admin/questions');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  //duplicate question
  const handleDuplicate = async () => {
    try {
      const newDuplicateQuestion = {
        subject,
        course,
        topic,
        difficulty,
        type,
        content,
        solution,
      };
      if (type === 'Text-Input') {
        questionData.answer = answer;
        questionData.correctAnswer = correctAnswer;
      } else if (type === 'Choice' || type === 'Multi-Choice') {
        questionData.answer1 = answer1;
        questionData.answer2 = answer2;
        questionData.answer3 = answer3;
        questionData.answer4 = answer4;
        questionData.correctAnswer = correctAnswer;
      }
      const { data } = await axios.post(
        `http://localhost:8080/api/question/duplicate-question/${id}`,
        newDuplicateQuestion,
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success('Question Duplicated Successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Dashboard - Update Question">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Update Question</h1>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select Course"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setCourse(value)}
              value={course}
            >
              {courses.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.name}
                </Option>
              ))}
            </Select>
            <Select
              bordered={false}
              placeholder="Select Subject"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setSubject(value)}
              value={subject}
            >
              {subjects.map((subject) => (
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
                className="form-control"
                onChange={(value) => setDifficulty(value)}
                value={difficulty}
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
                placeholder="Select Type"
                className="form-control"
                onChange={(value) => setType(value)}
                value={type}
              >
                <Option value="Text-Input">Text-Input</Option>
                <Option value="Choice">Choice</Option>
                <Option value="Multi-Choice">Multi-Choice</Option>
              </Select>
            </div>
            <div className="mb-3">
              <textarea
                value={content}
                placeholder="Enter Content"
                className="form-control"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {type === 'Text-Input' && (
              <>
                <div className="mb-3">
                  <textarea
                    value={answer}
                    placeholder="Enter Answer"
                    className="form-control"
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div>
              </>
            )}

            {(type === 'Choice' || type === 'Multi-Choice') && (
              <>
                <div className="mb-3">
                  <textarea
                    value={answer1}
                    placeholder="Enter Option 1"
                    className="form-control"
                    onChange={(e) => setAnswer1(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    value={answer2}
                    placeholder="Enter Option 2"
                    className="form-control"
                    onChange={(e) => setAnswer2(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    value={answer3}
                    placeholder="Enter Option 3"
                    className="form-control"
                    onChange={(e) => setAnswer3(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    value={answer4}
                    placeholder="Enter Option 4"
                    className="form-control"
                    onChange={(e) => setAnswer4(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="mb-3">
              <textarea
                value={correctAnswer}
                placeholder="Enter Correct Answer"
                className="form-control"
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                value={solution}
                placeholder="Enter Solution"
                className="form-control"
                onChange={(e) => setSolution(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update Question
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Question
              </button>
            </div>
            <div className="mb-3">
              <Link to={'/dashboard/admin/questions'}>
                <button className="btn btn-warning" onClick={handleDuplicate}>
                  Duplicate Question
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateQuestion;
