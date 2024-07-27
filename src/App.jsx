import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/User/Student/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Users from './pages/Admin/Users';
import CreateExam from './pages/Admin/CreateExam';
import CreateQuestion from './pages/Admin/CreateQuestion';
import Profile from './pages/User/Student/Profile';
import TestStatistic from './pages/User/Student/TestStatistic';
import Questions from './pages/Admin/Questions';
import UpdateQuestion from './pages/Admin/UpdateQuestion';
import CreateCourse from './pages/Admin/CreateCourse';
import Exams from './pages/Admin/Exams';
import CreateSubject from './pages/Admin/CreateSubject';
import UpdateExam from './pages/Admin/UpdateExam';
import Course from './pages/Course';
import DetailsQuestion from './pages/Admin/DetailsQuestion';
import ExamDetail from './pages/ExamDetail';
import DoExam from './pages/DoExam';
import TeacherRoute from './components/Routes/TeacherRoute';
import TeacherDashboard from './pages/User/Teacher/TeacherDashboard';
import CreateCourseTeacher from './pages/User/Teacher/CreateCourseTeacher';
import CreateSubjectTeacher from './pages/User/Teacher/CreateSubjectTeacher';
import CreateExamTeacher from './pages/User/Teacher/CreateExamTeacher';
import CreateQuestionTeacher from './pages/User/Teacher/CreateQuestionTeacher';
import QuestionTeacher from './pages/User/Teacher/QuestionTeacher';
import DetailQuestionTeacher from './pages/User/Teacher/DetailQuestionTeacher';
import UpdateQuestionTeacher from './pages/User/Teacher/UpdateQuestionTeacher';
import ExamsTeacher from './pages/User/Teacher/ExamsTeacher';
import UpdateExamTeacher from './pages/User/Teacher/UpdateExamTeacher';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exam/:_id" element={<ExamDetail />} />
        <Route path="/do-exam/:_id" element={<DoExam />} />
        <Route path="/course" element={<Course />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/test-statistics" element={<TestStatistic />} />
        </Route>
        <Route path="/dashboard" element={<TeacherRoute />}>
          <Route path="teacher" element={<TeacherDashboard />} />
          <Route path="teacher/create-course" element={<CreateCourseTeacher />} />
          <Route path="teacher/create-subject" element={<CreateSubjectTeacher />} />
          <Route path="teacher/create-exams" element={<CreateExamTeacher />} />
          <Route path="teacher/create-question" element={<CreateQuestionTeacher />} />
          <Route path="teacher/questions" element={<QuestionTeacher />} />
          <Route path="teacher/detail-question/:_id" element={<DetailQuestionTeacher />} />
          <Route path="teacher/question/:_id" element={<UpdateQuestionTeacher />} />
          <Route path="teacher/exams" element={<ExamsTeacher />} />
          <Route path="teacher/exam/:_id" element={<UpdateExamTeacher />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-question" element={<CreateQuestion />} />
          <Route path="admin/create-exams" element={<CreateExam />} />
          <Route path="admin/create-course" element={<CreateCourse />} />
          <Route path="admin/create-subject" element={<CreateSubject />} />
          <Route path="admin/detail-question/:_id" element={<DetailsQuestion />} />
          <Route path="admin/question/:_id" element={<UpdateQuestion />} />
          <Route path="admin/questions" element={<Questions />} />
          <Route path="admin/exams" element={<Exams />} />
          <Route path="admin/exam/:_id" element={<UpdateExam />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
