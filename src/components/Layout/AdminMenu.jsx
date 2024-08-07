import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-exams"
            className="list-group-item list-group-item-action "
          >
            Create Exams
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-course"
            className="list-group-item list-group-item-action "
          >
            Create Course
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-subject"
            className="list-group-item list-group-item-action "
          >
            Create Subject
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-question"
            className="list-group-item list-group-item-action "
          >
            Create Question
          </NavLink>
          <NavLink to="/dashboard/admin/exams" className="list-group-item list-group-item-action ">
            Exams
          </NavLink>
          <NavLink
            to="/dashboard/admin/questions"
            className="list-group-item list-group-item-action "
          >
            Questions
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action ">
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
