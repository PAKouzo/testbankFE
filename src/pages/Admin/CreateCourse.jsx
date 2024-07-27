import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import CourseForm from '../../components/Form/CourseForm';
import { Modal } from 'antd';

const CreateCourse = () => {
  const [courses, setCourses] = useState();
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/api/course/admin/create-course', {
        name,
      });
      if (data.success) {
        toast.success(`${name} is created`);
        getAllCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // get all courses
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/course/admin/courses');
      if (data?.success) {
        setCourses(data?.courses);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  //update course
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/course/admin/update-course/${selected._id}`,
        {
          name: updatedName,
        },
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setVisible(false);
        getAllCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  //delete course
  const handleDelete = async (cId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/course/admin/delete-course/${cId}`,
      );
      if (data.success) {
        toast.success(`${name} is delete`);
        getAllCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong when deleting course!');
    }
  };

  return (
    <Layout title="Dashboard - Create Course">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage Course Or Grade Level</h1>
          <div className="p-3 w-50">
            <CourseForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
            <CourseForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCourse;
