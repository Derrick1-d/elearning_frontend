const users = [
  { email: "admin@example.com", password: "admin123", role: "admin", name: "Admin User" },
  { email: "professor@example.com", password: "professor123", role: "professor", name: "Professor John" },
  { email: "student@example.com", password: "student123", role: "student", name: "Student Jane" },
];

const login = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        resolve(user);
      } else {
        reject("Invalid credentials");
      }
    }, 1000); 
  });
};

export default { login };
