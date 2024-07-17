import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/layout';
import UserMenu from '../../../components/Layout/UserMenu';
import { useAuth } from '../../../context/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const [avatar, setAvatar] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [gender, setGender] = useState('male');

  useEffect(() => {
    const { fullname, username, email } = auth?.user;
    setFullname(fullname);
    setUsername(username);
    setEmail(email);
    setAnswer(answer);
  }, [auth?.user]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('http://localhost:8080/api/auth/profile', {
        fullname,
        username,
        password,
        avatar,
        dateofbirth,
        gender,
      });
      if (data?.errro) {
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
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <form>
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
                </form>
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
                  <label htmlFor="exampleInputUserName" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputUserName" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputAccounttype" className="form-label d-flex">
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
                  <label htmlFor="exampleInputAccounttype" className="form-label d-flex">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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

export default Profile;
