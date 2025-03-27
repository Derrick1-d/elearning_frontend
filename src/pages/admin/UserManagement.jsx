import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserPlus, UploadCloud } from "lucide-react";

const UserManagement = () => {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    fullName: "",
    studentID: "",
    staffID: "",
    email: "",
    programme: "",
  });
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const generatePassword = () => Math.random().toString(36).slice(-8);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      fullName: formData.fullName,
      id: userType === "student" ? formData.studentID : formData.staffID,
      email: formData.email,
      programme: formData.programme,
      password: generatePassword(),
      role: userType,
    };

    try {
      await axios.post("/api/admin/register-user", userData);
      showAlert(`${userType} registered successfully!`, "success");
      setFormData({ fullName: "", studentID: "", staffID: "", email: "", programme: "" });
    } catch (error) {
      showAlert("Error registering user", "error");
    }
  };

  const handleUpload = async () => {
    if (!file) return showAlert("Please upload a file first!", "error");

    const reader = new FileReader();
    reader.onload = async (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const usersWithPasswords = sheetData.map((user) => ({
        fullName: user.Name,
        id: user.ID,
        email: user.Email,
        programme: user.Programme,
        password: generatePassword(),
        role: user.Role.toLowerCase(),
      }));

      try {
        await axios.post("/api/admin/bulk-register", { users: usersWithPasswords });
        showAlert("Users registered successfully!", "success");
      } catch (error) {
        showAlert("Error in bulk registration.", "error");
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto  shadow-md rounded-lg overflow-hidden max-w-4xl">
        <div className="text-grey py-3 px-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">User Management</h2>
        </div>

        {/* Alert Component */}
        {alert.message && (
          <div className={`p-3 text-center text-sm ${
            alert.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {alert.message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Individual Registration Column */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <UserPlus className="mr-2 text-blue-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Individual Registration</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">User Type</label>
                <select 
                  value={userType} 
                  onChange={(e) => setUserType(e.target.value)} 
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="professor">Professor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {userType === "student" ? (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Student ID</label>
                  <input
                    type="text"
                    name="studentID"
                    value={formData.studentID}
                    onChange={handleChange}
                    placeholder="Enter Student ID"
                    required
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Staff ID</label>
                  <input
                    type="text"
                    name="staffID"
                    value={formData.staffID}
                    onChange={handleChange}
                    placeholder="Enter Staff ID"
                    required
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Programme</label>
                <input
                  type="text"
                  name="programme"
                  value={formData.programme}
                  onChange={handleChange}
                  placeholder="Enter Programme"
                  required
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-gray-600 text-white py-1.5 text-sm rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                <UserPlus className="mr-2" size={16} />
                Register User
              </button>
            </form>
          </div>

          {/* Bulk Registration Column */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <UploadCloud className="mr-2 text-green-600" size={24} />
                <h3 className="text-lg font-semibold text-gray-800">Bulk Registration</h3>
              </div>

              <p className="text-xs text-gray-600 mb-3">
                Upload an Excel file (.xlsx, .xls) with user details to register multiple users.
              </p>

              <div className="mb-3">
                <input 
                  type="file" 
                  accept=".xlsx, .xls" 
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden" 
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer w-full bg-gray-200 text-gray-700 py-1.5 text-sm px-4 rounded-md hover:bg-gray-300 inline-block truncate"
                >
                  {file ? file.name : 'Choose File'}
                </label>
              </div>

              <button 
                onClick={handleUpload} 
                disabled={!file}
                className="w-full bg-green-600 text-white py-1.5 text-sm rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UploadCloud className="mr-2" size={16} />
                Upload and Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;