import { Routes, Route } from "react-router-dom";
import UserList from "../pages/admin/UserList";
import EditUser from "../pages/admin/EditUser"; 

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="users" element={<UserList />} />
      <Route path="users/edit/:id" element={<EditUser />} />
    </Routes>
  );
};

export default AdminRoutes;
