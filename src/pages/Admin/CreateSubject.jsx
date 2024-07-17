import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import SubjectForm from '../../components/Form/SubjectForm';
import { Modal } from 'antd';

const CreateSubject = () => {
  const [subjects, setSubjects] = useState();
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/api/subject/create-subject', {
        name,
      });
      if (data.success) {
        toast.success(`${name} is created`);
        getAllSubjects();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // get all subjects
  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/subject/subjects');
      if (data?.success) {
        setSubjects(data?.subjects);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllSubjects();
  }, []);

  //update subject
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/subject/update-subject/${selected._id}`,
        {
          name: updatedName,
        },
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setVisible(false);
        getAllSubjects();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  //delete subject
  const handleDelete = async (cId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/subject/delete-subject/${cId}`,
      );
      if (data.success) {
        toast.success(`${name} is delete`);
        getAllSubjects();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Dashboard - Create Subject">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage Subject</h1>
          <div className="p-3 w-50">
            <SubjectForm handleSubmit={handleSubmit} value={name} setValue={setName} />
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
                {subjects?.map((c) => (
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
            <SubjectForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateSubject;
