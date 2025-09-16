// src/components/Dashboard/ManagerDashboard.jsx
import React from 'react';


const ManagerHome = () => {
  const user = JSON.parse(localStorage.getItem('userdetails'));

  return (
    <div className="dashboard">
      <h2>ManagerAbout Dashboard</h2>
      <p>Welcome, {user.email} and {user.role}!</p>
      <p>This is the manager area. You can manage employees and access reports.</p>
    </div>
  );
};

export default ManagerHome;
