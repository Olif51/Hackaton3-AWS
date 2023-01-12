import { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminRoute from "./services/AdminRoute";
import ProtectedRoute from "./services/ProtectedRoute";
import { AuthContext } from "./services/AuthContext";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  return (
    <div className="h-screen w-screen relative">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <h1>Admin</h1>
            </AdminRoute>
          }
        />
      </Routes>
      {auth.isAuthenticated && !(location.pathname === "/admin") && <Footer />}
    </div>
  );
}

export default App;
