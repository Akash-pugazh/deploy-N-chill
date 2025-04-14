import { Navigate, useLocation } from 'react-router';
import { Outlet } from 'react-router';
const ProtectedRoute = () => {  

  const location = useLocation();
  const token = localStorage.getItem('token');
  console.log(token);
  // if (!token) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return <Outlet />;
}

export default ProtectedRoute;