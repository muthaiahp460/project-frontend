import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warn("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("https://aurora-artworks.onrender.com/login", {
        email,
        password
      });

      // Store user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", isAdmin ? "admin" : "user");
      localStorage.setItem("userId", response.data._id);

      // Show success message and redirect based on role
      const redirectPath = isAdmin ? "/admin-dashboard" : "/home";
      setEmail("");
      setPassword("");
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => navigate(redirectPath)
      });

    } catch (error) {
      console.error('Login error:', error);
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.roleToggle}>
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Login as Admin
          </label>
        </div>
        <button onClick={handleLogin} className={styles.loginButton}>
          Login
        </button>
        <div className={styles.links}>
          <Link to="/register" className={styles.link}>
            Don't have an account? Register here
          </Link>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default Login;
