import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./route";
import './index.css'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
