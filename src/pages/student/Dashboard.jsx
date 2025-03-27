import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../components/layouts/StudentLayout";


const StudentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <StudentLayout>
      <div style={styles.container}>
      <h1>Student Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <button onClick={() => { logout(); navigate("/login"); }} style={styles.button}>Logout</button>
    </div>
    </StudentLayout>
    
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: { padding: "10px 20px", cursor: "pointer" },
};

export default StudentDashboard;
