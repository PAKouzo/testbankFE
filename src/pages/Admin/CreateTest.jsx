import React from 'react';
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/AdminMenu';

const CreateTest = () => {
  return (
    <Layout title="Dashboard - Create Test">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Test</h1>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTest;
