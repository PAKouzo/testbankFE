import React from 'react';
import { NavLink } from 'react-router-dom';

const TeacherMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Teacher Panel</h4>
          <NavLink
            to="/dashboard/teacher/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/teacher/create-exams"
            className="list-group-item list-group-item-action "
          >
            Create Exams
          </NavLink>
          <NavLink
            to="/dashboard/teacher/create-course"
            className="list-group-item list-group-item-action "
          >
            Create Course
          </NavLink>
          <NavLink
            to="/dashboard/teacher/create-subject"
            className="list-group-item list-group-item-action "
          >
            Create Subject
          </NavLink>
          <NavLink
            to="/dashboard/teacher/create-question"
            className="list-group-item list-group-item-action "
          >
            Create Question
          </NavLink>
          <NavLink
            to="/dashboard/teacher/exams"
            className="list-group-item list-group-item-action "
          >
            Exams
          </NavLink>
          <NavLink
            to="/dashboard/teacher/questions"
            className="list-group-item list-group-item-action "
          >
            Questions
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default TeacherMenu;
