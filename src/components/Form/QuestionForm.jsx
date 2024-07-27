import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const QuestionForm = ({ onQuestionCreated, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [answer, setAnswer] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [correctAnswer1, setCorrectAnswer1] = useState('');
  const [solution, setSolution] = useState('');
  const navigate = useNavigate();

  // Get all courses
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/course/admin/courses');
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while fetching courses');
    }
  };

  // Get all subjects
  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/subject/admin/subjects');
      if (data.success) {
        setSubjects(data.subjects);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while fetching subjects');
    }
  };

  //Get all questions
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

  // Handle create
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
      questionData.append('solution', solution);

      if (type === 'Text-Input') {
        questionData.append('correctAnswer', correctAnswer);
      } else if (type === 'Choice') {
        questionData.append('answer1', answer1);
        questionData.append('answer2', answer2);
        questionData.append('answer3', answer3);
        questionData.append('answer4', answer4);
        questionData.append('correctAnswer', correctAnswer);
      } else if (type === 'Multi-Choice') {
        questionData.append('answer', answer);
        questionData.append('answer1', answer1);
        questionData.append('answer2', answer2);
        questionData.append('answer3', answer3);
        questionData.append('answer4', answer4);
        questionData.append('correctAnswer', correctAnswer);
        questionData.append('correctAnswer1', correctAnswer1);
      }

      const { data } = await axios.post(
        'http://localhost:8080/api/question/admin/create-question',
        questionData,
      );

      if (data.success) {
        toast.success('Question Created Successfully');
        onQuestionCreated(data.question);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error(data.message || 'Error creating question!');
      }
      getAllQuestion();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when creating question!');
    }
  };

  return (
    <div className="question-form-overlay">
      <div className="question-form-container">
        <h2>Create New Question</h2>
        <div className="m-1 w-75">
          <Select
            bordered={false}
            placeholder="Select Course"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => setCourse(value)}
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
                  value={correctAnswer}
                  placeholder="Enter Correct Answer"
                  className="form-control"
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                />
              </div>
            </>
          )}

          {type === 'Multi-Choice' && (
            <>
              <div className="mb-3">
                <textarea
                  value={answer}
                  placeholder="Enter Option 1"
                  className="form-control"
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  value={answer1}
                  placeholder="Enter Option 2"
                  className="form-control"
                  onChange={(e) => setAnswer1(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  value={answer2}
                  placeholder="Enter Option 3"
                  className="form-control"
                  onChange={(e) => setAnswer2(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  value={answer3}
                  placeholder="Enter Option 4"
                  className="form-control"
                  onChange={(e) => setAnswer3(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  value={answer4}
                  placeholder="Enter Option 5"
                  className="form-control"
                  onChange={(e) => setAnswer4(e.target.value)}
                />
              </div>
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
                  value={correctAnswer1}
                  placeholder="Enter Another Correct Answer"
                  className="form-control"
                  onChange={(e) => setCorrectAnswer1(e.target.value)}
                />
              </div>
            </>
          )}

          {type === 'Choice' && (
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
              <div className="mb-3">
                <textarea
                  value={correctAnswer}
                  placeholder="Enter Correct Answer"
                  className="form-control"
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="mb-3">
            <textarea
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
        <div className="mb-3">
          <button className="btn btn-secondary ms-2" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
