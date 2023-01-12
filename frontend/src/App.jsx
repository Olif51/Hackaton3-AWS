import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminRoute from "./services/AdminRoute";
import ProtectedRoute from "./services/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="h-screen w-screen relative">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Navbar" element={<Navbar />} />
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
    </div>
  );
}

export default App;
