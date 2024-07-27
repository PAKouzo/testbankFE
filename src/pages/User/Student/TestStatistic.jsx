import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/layout';
import UserMenu from '../../../components/Layout/UserMenu';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './TestStatistic.css';

const TestStatistic = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/auth/results/${_id}`);
        if (data.success) {
          setResults(data.results);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchResults();
  }, [_id]);
  return (
    <Layout title="Your Test Statistics">
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Test Statistics</h1>
            <div className="dashboard">
              <h1 className="text-center">Your Exam Results</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>Exam Name</th>
                    <th>Score</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result._id}>
                      <td>{result.examId.name}</td>
                      <td>{result.score}</td>
                      <td>{new Date(result.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn btn-primary" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestStatistic;
