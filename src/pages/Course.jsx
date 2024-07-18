import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/layout';
import useCourse from '../hooks/useCourse';

const Course = () => {
  const courses = useCourse();
  return (
    <Layout title="All Courses">
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row container">
          {courses?.map((course) => (
            <div className="col-md-4 p-2" key={course?._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{course?.name}</h5>
                  <p className="card-text">{course?.description}</p>
                  <Link to={`/course/${course?._id}`} className="btn btn-primary">
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Course;
