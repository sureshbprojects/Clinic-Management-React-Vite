// src/components/Dashboard/AdminDashboard.jsx
import React from 'react';


const AdminHome = () => {
  const user = JSON.parse(localStorage.getItem('userdetails'));
    
  return (
    <div className="dashboard">
      <h2>AdminHome Dashboard</h2>
      <p>Welcome, {user.email} and {user.role}!</p>
      <p>This is the admin-only area. You have full access to the system.</p>
      <div className="dashboard-actions">
        <button onClick={() => window.location.href = '/register'}>Register New User</button>
      </div>
    </div>
  );
};

export default AdminHome;
