import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const ProfessorLayout = ({ children }) => {
  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <Sidebar role="professor" />
        <main style={styles.main}>{children}</main>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", height: "100vh" },
  content: { display: "flex", flex: 1 },
  main: { flex: 1, padding: "20px", background: "#f5f5f5" },
};

export default ProfessorLayout;
