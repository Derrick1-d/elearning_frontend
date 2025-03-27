import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/admin/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/users/${id}`, user);
      alert("User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      alert("Error updating user");
    }
  };

  return user ? (
    <div className="p-6 bg-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Email"
        />
        <input
          type="text"
          name="programme"
          value={user.programme}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Programme"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
          Save Changes
        </button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditUser;
