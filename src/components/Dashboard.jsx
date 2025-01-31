import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

const Dashboard = (callback) => {
  const [email, setEmail] = useState('');
  const [uname, setUname] = useState('');
  const [password, setPassword] = useState('');
  const [totalSales, setTotalSales] = useState(12345);
  const [ordersToday, setOrdersToday] = useState(34);
  const [registeredUsers, setRegisteredUsers] = useState(1245);
  const [totalArtworks, setTotalArtworks] = useState(58);

  const handleRegister = async () => {
    try {
      await axios.post(`https://aurora-artworks.onrender.com/register`, {
        email,
        uname,
        password,
      });
      callback("Admin");
      alert('Registration successful');
      // Increment registered users dynamically
      setRegisteredUsers((prev) => prev + 1);
    } catch (error) {
        callback("Admin");
      alert('Error during registration');
    }
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin! Manage your artwork store efficiently.</p>
      </header>

      {/* REGISTRATION SECTION */}
      <section className="dashboard-register">
        <h2>Register New Admin/User</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUname(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleRegister}>Register</button>
      </section>

      {/* BUSINESS OVERVIEW */}
      <section className="dashboard-overview">
        <h2>Business Overview</h2>
        <div className="overview-cards">
          <div className="card">
            <h3>Total Sales</h3>
            <p>${totalSales}</p>
          </div>
          <div className="card">
            <h3>Orders Today</h3>
            <p>{ordersToday}</p>
          </div>
          <div className="card">
            <h3>Registered Users</h3>
            <p>{registeredUsers}</p>
          </div>
          <div className="card">
            <h3>Total Artworks</h3>
            <p>{totalArtworks}</p>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="dashboard-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/manage-artworks" className="action-card">
            <h3>Manage Artworks</h3>
            <p>Add, update, or delete artworks.</p>
          </Link>
          <Link to="/admin/manage-orders" className="action-card">
            <h3>Manage Orders</h3>
            <p>View and process customer orders.</p>
          </Link>
          <Link to="/admin/manage-users" className="action-card">
            <h3>Manage Users</h3>
            <p>View and manage registered users.</p>
          </Link>
          <Link to="/admin/reports" className="action-card">
            <h3>Reports</h3>
            <p>Generate sales and performance reports.</p>
          </Link>
        </div>
      </section>

      {/* RECENT ORDERS */}
      <section className="dashboard-reports">
        <h2>Recent Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#12345</td>
              <td>John Doe</td>
              <td>$120</td>
              <td>Shipped</td>
              <td>
                <button>View</button>
                <button>Update</button>
              </td>
            </tr>
            <tr>
              <td>#12346</td>
              <td>Jane Smith</td>
              <td>$240</td>
              <td>Processing</td>
              <td>
                <button>View</button>
                <button>Update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <p>
          {new Date().getFullYear()} Artwork Store Admin Panel. All rights
          reserved.
        </p>
      </footer>

      <style jsx>{`
        .dashboard-container {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #333;
        }

        .dashboard-header {
          text-align: center;
          background: #f5f5f5;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 30px;
        }

        .dashboard-register {
          text-align: center;
          margin-bottom: 30px;
        }

        .dashboard-overview {
          margin-bottom: 30px;
        }

        .overview-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .card {
          background: #007bff;
          color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          font-size: 18px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .dashboard-actions {
          margin-bottom: 30px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .action-card {
          text-decoration: none;
          background: #f9f9f9;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 10px;
          text-align: center;
          color: #333;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .action-card:hover {
          transform: scale(1.05);
          background: #007bff;
          color: white;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .orders-table th,
        .orders-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }

        .orders-table th {
          background: #f5f5f5;
        }

        .dashboard-footer {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};


<footer className="footer-section">
<p> {new Date().getFullYear()} Artwork Store. All rights reserved.</p>
<p>
  <strong>Follow us:</strong> Instagram | Twitter | Facebook
</p>
</footer>

export default Dashboard;