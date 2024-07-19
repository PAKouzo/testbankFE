import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { Select, Radio } from 'antd';
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
  const [question, setQuestion] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(['']);
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswers, setNewAnswers] = useState(['']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [questionType, setQuestionType] = useState('');
  const [textInputAnswer, setTextInputAnswer] = useState('');
  const [multiChoiceCorrectAnswers, setMultiChoiceCorrectAnswers] = useState([]);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState([]);

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

  const handleAddAnswer = () => {
    setNewAnswers([...newAnswers, '']);
  };

  const handleRemoveAnswer = (index) => {
    const updatedAnswers = newAnswers.filter((_, i) => i !== index);
    setNewAnswers(updatedAnswers);
  };

  const handleAnswerChange = (value, index) => {
    const updatedAnswers = [...newAnswers];
    updatedAnswers[index] = value;
    setNewAnswers(updatedAnswers);
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion || !questionType) {
      toast.error('Please fill in all required fields');
      return;
    }

    let questionData = {
      subject: subject,
      course: course,
      topic: topic,
      content: newQuestion,
      type: questionType,
    };

    switch (questionType) {
      case 'Choice':
        if (newAnswers.length !== 4 || correctAnswerIndex === null) {
          toast.error('Please provide 4 answers and select the correct one for Choice type');
          return;
        }
        questionData.answers = newAnswers;
        questionData.correctAnswerIndex = correctAnswerIndex;
        break;
      case 'Multi-Choice':
        if (newAnswers.length === 0 || multiChoiceCorrectAnswers.length === 0) {
          toast.error('Please provide answers and select correct ones for Multi-Choice type');
          return;
        }
        questionData.answers = newAnswers;
        questionData.correctAnswers = multiChoiceCorrectAnswers;
        break;
      case 'Text-Input':
        if (!textInputAnswer) {
          toast.error('Please provide the correct answer for Text-Input type');
          return;
        }
        questionData.correctAnswer = textInputAnswer;
        break;
      default:
        toast.error('Invalid question type');
        return;
    }

      try {
        const { data } = await axios.post(
          'http://localhost:8080/api/question/create-question',
          questionData,
          console.log(questionData)
        );
        if (data?.success) {
          toast.success('Question Created Successfully');
          setQuestions([...questions, data.question]);
          setShowQuestionForm(false);
          resetQuestionForm();
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
      return null;
  };

  const resetQuestionForm = () => {
    setNewQuestion('');
    setNewAnswers(['', '', '', '']);
    setCorrectAnswerIndex(null);
    setQuestionType('');
    setTextInputAnswer('');
    setMultiChoiceCorrectAnswers([]);
  };
  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
    if (value === 'Choice') {
      setNewAnswers(['', '', '', '']);
    } else {
      setNewAnswers(['']);
    }
    setCorrectAnswerIndex(null);
    setMultiChoiceCorrectAnswers([]);
  };


  //create exam
  const handleCreate = async (e) => {
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
        question: selectedQuestions
      };

      const { data } = await axios.post('http://localhost:8080/api/exam/create-exam', examData);
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
                Add Available Questions
              </button>
              <button
                onClick={() => setShowQuestionForm(!showQuestionForm)}
                className="btn btn-primary mb-2 ms-2"
              >
                Input Questions
              </button>
            </div>
            {showQuestionForm && (
              <div className="question-form">
                <div className="mb-3">
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
                </div>
                <div className="mb-3">
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
                    placeholder="Select Question Type"
                    size="large"
                    className="form-select"
                    onChange={handleQuestionTypeChange}
                  >
                    <Option value="Choice">Choice</Option>
                    <Option value="Multi-Choice">Multi-Choice</Option>
                    <Option value="Text-Input">Text-Input</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={newQuestion}
                    placeholder="Question"
                    className="form-control"
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                </div>
                {questionType === 'Choice' && (
                  <>
                    {newAnswers.map((answer, index) => (
                      <div key={index} className="d-flex align-items-center mb-3">
                        <input
                          type="text"
                          value={answer}
                          placeholder={`Answer ${index + 1}`}
                          className="form-control"
                          onChange={(e) => handleAnswerChange(e.target.value, index)}
                        />
                      </div>
                    ))}
                    <div className="mb-3">
                      <Radio.Group
                        onChange={(e) => setCorrectAnswerIndex(e.target.value)}
                        value={correctAnswerIndex}
                      >
                        {newAnswers.map((_, index) => (
                          <Radio key={index} value={index}>
                            Answer {index + 1} is correct
                          </Radio>
                        ))}
                      </Radio.Group>
                    </div>
                  </>
                )}
                {questionType === 'Multi-Choice' && (
                  <>
                    {newAnswers.map((answer, index) => (
                      <div key={index} className="d-flex align-items-center mb-3">
                        <input
                          type="text"
                          value={answer}
                          placeholder={`Answer ${index + 1}`}
                          className="form-control"
                          onChange={(e) => handleAnswerChange(e.target.value, index)}
                        />
                        <button
                          onClick={() => handleRemoveAnswer(index)}
                          className="btn btn-danger ms-2"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <button onClick={handleAddAnswer} className="btn btn-primary mb-2">
                      Add Answer
                    </button>
                    <div className="mb-3">
                      <Select
                        bordered={false}
                        placeholder="Select Correct Answers"
                        size="large"
                        className="form-select"
                        mode="multiple"
                        onChange={(values) => setMultiChoiceCorrectAnswers(values)}
                      >
                        {newAnswers.map((_, index) => (
                          <Option key={index} value={index}>
                            Answer {index + 1}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </>
                )}
                {questionType === 'Text-Input' && (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={textInputAnswer}
                      placeholder="Correct Answer"
                      className="form-control"
                      onChange={(e) => setTextInputAnswer(e.target.value)}
                    />
                  </div>
                )}
                <button onClick={handleCreateQuestion} className="btn btn-success mb-2">
                  Create Question
                </button>
              </div>
            )}
            <div className="mb-3">
              <button className="btn btn-success" onClick={handleCreate}>
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
