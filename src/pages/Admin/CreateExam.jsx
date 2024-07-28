import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import toast from 'react-hot-toast';
import './CreateExam.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
const { Option } = Select;

const CreateExam = () => {
  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [course, setCourse] = useState('');
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [point, setPoint] = useState('');
  const [decription, setDecription] = useState('');
  const [correctChoice, setCorrectChoice] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  // const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState(new Date());

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
  const [solution, setSolution] = useState('');
  const [correctAnswer1, setCorrectAnswer1] = useState('');


  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const navigate = useNavigate();

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
  //   const handleQuestionCreated = (newQuestion) => {
  //     if (newQuestion) {
  //       setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  //       console.log('Câu hỏi mới:', newQuestion);
  //       getAllQuestion();
  //     } else {
  //       toast.error('Không thể tạo câu hỏi mới. Vui lòng thử lại.');
  //     }
  //   };

  // Handle create
  const handleCreateQuestion = async (e) => {
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

      if (data?.success) {
        toast.success('Question Created Successfully');
      } else {
        toast.error(data.message || 'Error creating question!');
      }
      setShowQuestionForm(false);
      getAllQuestion();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when creating question!');
    }
  };

  const handleQuestionChange = (value, index) => {
    const updatedQuestions = [...selectedQuestions];
    updatedQuestions[index] = value;
    setSelectedQuestions(updatedQuestions);
  };

  //create exam
  const handleCreateExam = async (e) => {
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
        // timeStart,
        timeEnd: timeEnd.toISOString(),
        point,
        decription,
        correctChoice,
        question: selectedQuestions,
      };

      const { data } = await axios.post(
        'http://localhost:8080/api/exam/admin/create-exam',
        examData,
      );
      if (data?.success) {
        toast.success('Exam Created Successfully');
        navigate('/dashboard/admin/exams');
      } else {
        toast.error(data?.message);
        console.log(data)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when creating exam!');
    }
  };

  const handleDateChange = (date) => {
    setTimeEnd(date);
  }
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
            {/* <div className="mb-3">
              <input
                type="text"
                value={timeStart}
                placeholder="Thời gian bắt đầu"
                className="form-control"
                onChange={(e) => setTimeStart(e.target.value)}
              />
            </div> */}
            <div className="mb-3">
              <p>Chọn ngày hết hạn</p>
              <DatePicker selected={timeEnd} onChange={handleDateChange} />
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
                onClick={() => setShowQuestionForm(true)}
                className="btn btn-primary mb-2 ms-2"
              >
                Create Question
              </button>
              {showQuestionForm && (
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
                        <button className="btn btn-primary" onClick={handleCreateQuestion}>
                          Create Question
                        </button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                          setShowQuestionForm(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-3">
              <button className="btn btn-success" onClick={handleCreateExam}>
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