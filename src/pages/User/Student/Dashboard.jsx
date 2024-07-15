import React from 'react';
import Layout from '../../../components/Layout/layout';
import UserMenu from '../../../components/Layout/UserMenu';
import { useAuth } from '../../../context/auth';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={'Student Dashboard'}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Student Name : {auth?.user?.fullname}</h3>
              <h3>Student Email: {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
