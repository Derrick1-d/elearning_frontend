import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfessorLayout from "../../components/Layouts/ProfessorLayout";

function ProfessorDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <ProfessorLayout>
      <div style={styles.container}>
        <h1>Professor Dashboard</h1>
        <p>Welcome, {user?.name}!</p>
        <button onClick={() => { logout(); navigate("/login"); } } style={styles.button}>Logout</button>
      </div>
    </ProfessorLayout>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: { padding: "10px 20px", cursor: "pointer" },
};

export default ProfessorDashboard;
