import React, { useState } from 'react';
import Layout from '../../components/Layout/layout';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../../styles/AuthStyle.css';

const Register = () => {
  const [fullname, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [accounttype, setAccountType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', {
        fullname,
        username,
        accounttype,
        email,
        password,
        answer,
      });
      if (password !== confirmpassword) {
        toast.error('Password does not match');
        return;
      }
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
      toast.success('Registration Successful');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <Layout title={'Register'}>
      <div className="form-container">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="form-control"
              id="exampleInputFullName"
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              id="exampleInputUsername"
              placeholder="Enter Username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAccounttype" className="form-label d-flex">
              Account Type
            </label>
            <select
              className="form-select"
              value={accounttype}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="What is your hobby?"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
