import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCourse() {
  const [courses, setCourses] = useState([]);

  //get courses
  const getCourses = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/course/courses');
      if (data?.success) {
        setCourses(data?.courses);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return courses;
}
