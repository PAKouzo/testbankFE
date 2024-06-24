import React, { useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Option } = Select;

const CreateQuestion = () => {
  const [subject, setSubject] = useState([]);
  const [gradeLevel, setGradeLevel] = useState([]);
  const [topic, setTopic] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [type, setType] = useState([]);
  const [content, setContent] = useState('');
  const [answers, setAnswers] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [solution, setSolution] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const questionData = new FormData();
      questionData.append('subject', subject);
      questionData.append('gradeLevel', gradeLevel);
      questionData.append('topic', topic);
      questionData.append('difficulty', difficulty);
      questionData.append('type', type);
      questionData.append('content', content);
      questionData.append('answers', answers);
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
          <div className="mb-3">
            <input
              type="text"
              value={subject}
              placeholder="Enter Subject"
              className="form-control"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={gradeLevel}
              placeholder="Enter Grade Level"
              className="form-control"
              onChange={(e) => setGradeLevel(e.target.value)}
            />
          </div>
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
              value={answers}
              placeholder="Enter Answers"
              className="form-control"
              onChange={(e) => setAnswers(e.target.value)}
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
    </Layout>
  );
};

export default CreateQuestion;
