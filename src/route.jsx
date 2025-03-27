import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";
import UserList from "./pages/Admin/UserList";
import ProfessorDashboard from "./pages/Professor/Dashboard";
import StudentDashboard from "./pages/Student/Dashboard";
import NotFound from "./pages/NotFound";

import AdminLayout from "./components/layouts/AdminLayout";

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/not-found" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={ <PrivateRoute role="admin"><AdminDashboard /></PrivateRoute> } />
        <Route path="/admin/users" element={ <PrivateRoute role="admin"><AdminLayout><UserManagement /> </AdminLayout> </PrivateRoute> }/>
        <Route path="/admin/users-list" element={<PrivateRoute role="admin"><AdminLayout><UserList /></AdminLayout></PrivateRoute>} />


        {/* Professor and Student Routes */}
        <Route path="/professor" element={ <PrivateRoute role="professor"><ProfessorDashboard /> </PrivateRoute> }/>
        <Route path="/student" element={ <PrivateRoute role="student"> <StudentDashboard /> </PrivateRoute> }/>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
