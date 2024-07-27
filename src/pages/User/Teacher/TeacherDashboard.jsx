import React from 'react';
import TeacherMenu from '../../../components/Layout/TeacherMenu';
import { useAuth } from '../../../context/auth';
import Layout from '../../../components/Layout/layout';

const TeacherDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title="Teacher Dashboard">
      <div className="container-fruid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <TeacherMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Teacher Name : {auth?.user?.fullname} </h3>
              <h3>Teacher Email: {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
