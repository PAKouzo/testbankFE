import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/auth/get-all');
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title="Dashboard - Users">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>All Users</h1>
          <div className="user-list">
            {users.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.fullname}</td>
                      <td>{user.email}</td>
                      <td>{user.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
