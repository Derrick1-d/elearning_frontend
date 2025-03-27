import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";


const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AdminLayout>              
      <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <button onClick={() => { logout(); navigate("/login"); }} style={styles.button}>Logout</button>
    </div>
    </AdminLayout>
    
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: { padding: "10px 20px", cursor: "pointer" },
};

export default AdminDashboard;
