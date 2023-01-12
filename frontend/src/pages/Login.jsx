import { NavLink, useNavigate } from "react-router-dom";
import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState({});
  const handleLogin = async (e) => {
    e.preventDefault();
    const userInformations = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const newErrors = {};
    if (!userInformations.email) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/\S+@\S+\.\S+/.test(userInformations.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!userInformations.password.length) {
      newErrors.password = "Le mot de passe est obligatoire";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post("http://localhost:5000/users/login", userInformations);
        setAuth({ isAuthenticated: true });
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="h-screen w-screen flex flex-col items-center">
      <img
        className="mx-auto h-20 w-auto mt-10"
        src="../src/assets/pictures/logo.png"
        alt="logo"
      />
      <form
        className="w-full bg-white p-6 rounded-lg mx-auto"
        onSubmit={handleLogin}
      >
        <h1 className="text-center text-3xl font-medium mb-4">Log In</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full border border-gray-400 p-2 rounded-lg"
            type="email"
            id="email"
            ref={emailRef}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full border border-gray-400 p-2 rounded-lg"
            type="password"
            id="password"
            ref={passwordRef}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="flex items-center justify-evenly">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Log In
          </button>
          <div className="flex flex-col items-center">
            <p className="text-gray-700">Don't have an account?</p>
            <NavLink
              to="/register"
              className="text-blue-500 hover:text-blue-700 ml-2"
            >
              Register
            </NavLink>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
