import { Navigate } from "react-router-dom";

// Mock auth check function (replace with your actual auth logic)
const isAuthenticated = () => {
  return localStorage.getItem("token"); // For example, check if a token exists in localStorage
};

function ProtectedRoute({ children, route }) {

  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
