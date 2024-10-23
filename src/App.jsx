import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import ProtectedRoute from "./ProtectedRoute";
import User from "./pages/User";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh", // Use minHeight instead of height
          display: "flex",
          justifyContent: "center", // Horizontally center
          alignItems: "center", // Vertically center
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path={`/user/:userId`}
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          
          <Route
            path={`/addUser`}
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}
export default App;
