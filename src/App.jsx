import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import AdminHome from './components/admin/AdminHome'
import AdminAbout from './components/admin/AdminAbout'
import AdminManage from './components/admin/AdminManage'
import AdminUserEdit from './components/admin/AdminUserEdit'
import AdminUserDelete from './components/admin/AdminUserDelete'
import ManagerHome from './components/manager/ManagerHome'
import ManagerAbout from './components/manager/ManagerAbout'
import EmployeeHome from './components/employee/EmployeeHome'
import EmployeeAbout from './components/employee/EmployeeAbout'
import PatientHome from './components/Patient/PatientHome'
import PatientDelete from './components/Patient/PatientDelete'
import PatientEdit from './components/Patient/PatientEdit'
import AppointmentDelete from './components/Patient/AppointmentDelete'
import BookAppointments from './components/Patient/BookAppointments'
import AppointmentsEdit from './components/Patient/AppointmentsEdit'
import Appointments from './components/Patient/Appointments'
import PatientRegistration from './components/Patient/PatientRegistration'
import { Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'
import PasswordResetRequest from './components/PasswordResetRequest'
import PasswordReset from './components/PasswordReset'

function App() {
  const location = useLocation()
  const noNavbar = location.pathname === "/register" || location.pathname === "/" || location.pathname.includes("password")

  return (
    <>
      {
        noNavbar ?
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/request/password_reset" element={<PasswordResetRequest />} />
            <Route path="/password-reset/:token" element={<PasswordReset />} />
          </Routes>

          :

          <Navbar
            content={
              <Routes>
                <Route path="/unauthorized" element={
                  <div className="unauthorized">
                    <h2>Unauthorized Access</h2>
                    <p>You don't have permission to access this page.</p>
                  </div>
                } />
                <Route element={<ProtectedRoute roles={['admin']} />}>
                  <Route path="/adminhome" element={<AdminHome />} />
                  <Route path="/adminabout" element={<AdminAbout />} />
                  <Route path="/adminmanage" element={<AdminManage />} />
                  <Route path="/adminuseredit/:id" element={<AdminUserEdit />} />
                  <Route path="/adminuserdelete/:id" element={<AdminUserDelete />} />
                </Route>
                <Route element={<ProtectedRoute roles={['admin', 'manager']} />}>
                  <Route path="/managerhome" element={<ManagerHome />} />
                  <Route path="/managerabout" element={<ManagerAbout />} />
                </Route>
                <Route element={<ProtectedRoute roles={['employee', 'manager', 'admin']} />}>
                  <Route path="/employeehome" element={<EmployeeHome />} />
                  <Route path="/employeeabout" element={<EmployeeAbout />} />
                  <Route path="/patienthome" element={<PatientHome />} />
                  <Route path="/patientregistration" element={<PatientRegistration />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/bookappointments" element={<BookAppointments />} />
                  <Route path="/appointmentdelete/:id" element={<AppointmentDelete />} />
                  <Route path="/patientdelete/:id" element={<PatientDelete />} />
                  <Route path="/patientedit/:id" element={<PatientEdit />} />
                  <Route path="/appointmentsedit/:id" element={<AppointmentsEdit />} />
                </Route>
              </Routes>

            }
          />
      }
    </>
  )
}

export default App
