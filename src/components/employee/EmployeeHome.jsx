// src/components/Dashboard/EmployeeDashboard.jsx
import React from 'react';


const EmployeeHome = () => {
  const user = JSON.parse(localStorage.getItem('userdetails'));

  return (
    <div className="dashboard">
      <h2>EmployeeAbout Dashboard</h2>
      <p>Welcome, {user.email} and {user.role}!</p>
      <p>This is your personal dashboard. You can view your tasks and update your profile.</p>
    </div>
  );
};

export default EmployeeHome;
