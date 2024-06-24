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
import CreateTest from './pages/Admin/CreateTest';
import CreateQuestion from './pages/Admin/CreateQuestion';
import Profile from './pages/User/Student/Profile';
import TestStatistic from './pages/User/Student/TestStatistic';
import Questions from './pages/Admin/Questions';
import UpdateQuestion from './pages/Admin/UpdateQuestion';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/test-statistics" element={<TestStatistic />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-test" element={<CreateTest />} />
          <Route path="admin/create-question" element={<CreateQuestion />} />
          <Route path="admin/question/:slug" element={<UpdateQuestion />} />
          <Route path="admin/questions" element={<Questions />} />
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
