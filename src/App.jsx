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
