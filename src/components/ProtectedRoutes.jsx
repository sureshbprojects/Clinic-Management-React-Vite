import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ roles }) => {

    const userdetails = JSON.parse(localStorage.getItem('userdetails'))

    if (!userdetails) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(userdetails.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;

}

export default ProtectedRoute