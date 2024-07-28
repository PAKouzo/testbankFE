import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout/layout';
import TeacherMenu from '../../../components/Layout/TeacherMenu';
import '../../../styles/TeacherProfile.css';

const TeacherProfile = () => {
  const [auth, setAuth] = useAuth();

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [gender, setGender] = useState('male');

  useEffect(() => {
    const { fullname, username, email } = auth?.user;
    setFullname(fullname);
    setUsername(username);
    setEmail(email);
  }, [auth?.user]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('avatar', avatar);
      formData.append('dateofbirth', dateofbirth);
      formData.append('gender', gender);

      const { data } = await axios.put('http://localhost:8080/api/auth/profile', formData);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success('Profile Updated Successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Your Profile">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <TeacherMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="title">Teacher Profile</h4>
                <div className="mb-3">
                  <label htmlFor="avatarInput" className="form-label">
                    Upload avatar
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="avatarInput"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                {avatar && (
                  <div className="mb-3">
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="Avatar"
                        height={200}
                        className="img img-responsive"
                      />
                    </div>
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="exampleInputFullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="form-control"
                    id="exampleInputFullName"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputUserName" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    id="exampleInputUserName"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputDateofbirth" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dateofbirth}
                    onChange={(e) => setDateofbirth(e.target.value)}
                    className="form-control"
                    id="exampleInputDateofbirth"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputGender" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    id="exampleInputGender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherProfile;
