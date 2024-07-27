import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

const TeacherRoute = () => {
  const [oke, setOke] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get('http://localhost:8080/api/auth/teacher-auth');
      if (res.data.ok) {
        setOke(true);
      } else {
        setOke(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return oke ? <Outlet /> : <Spinner path="" />;
};

export default TeacherRoute;
