import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const [visible, setVisible] = useState(false)
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [updateFullname, setUpdateFullname] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateDateOfBirth, setUpdateDateOfBirth] = useState('');
  const [updateAge, setUpdateAge] = useState('');
  const [updateGender, setUpdateGender] = useState('');
  
  const navigate = useNavigate();
  //get all users
  const getAllUser = async () => {
    try{
      const { data } = await axios.get('http://localhost:8080/api/auth/get-all');
      if(data.success){
        setUsers(data.users)
      }
    }
    catch(error){
      console.log(error);
      toast.error('Geing all users failed!')
    }
  }
  useEffect(()=>{
    getAllUser();
  }, [])
  const handleUpdate = async() => {
    e.preventDefault();
    try{
      const { data } = await axios.put(`http://localhost:8080/api/auth/profile`, 
      {
        fullname: updateFullname,
        email: updateEmail,
        dateOfBirth: updateDateOfBirth,
        age: updateAge,
        gender: updateGender
      });
    }
    catch(e){
      console.log(e)
    }
  }
  const handleDelete = async (id) => {
    try{
      const { data } = await axios.delete(
        `http://localhost:8080/api/auth/delete/${id}`,
      );
      if(data.success){
        toast.success("Delete user successfully!")
        getAllUser();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(e){
      console.log(e)
      toast.error('Something went wrong when deleting user!');
    }
  }
  return (
    <Layout title="Dashboard - Users">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullname}</td>
                  <td>{user.gender}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-danger ms-2" onClick={() => {handleDelete(user._id)}}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
