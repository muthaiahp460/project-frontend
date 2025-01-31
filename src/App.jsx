import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadArtworks from "./pages/UploadArtworks";
import AdminDashboard from "./pages/AdminDashBoard";
import ArtworkForm from "./pages/ArtworkForm";
import "./styles.css";
import Dashboard from "./components/Dashboard";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return element;
};

const AdminRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (role !== "admin") {
    return <Navigate to="/home" />;
  }
  
  return element;
};

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route 
            path="/home" 
            element={<PrivateRoute element={<Home />} />} 
          />
          
          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={<AdminRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/upload-artworks"
            element={<AdminRoute element={<UploadArtworks />} />}
          />
          <Route
            path="/add"
            element={<AdminRoute element={<ArtworkForm />} />}
          />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dash" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
