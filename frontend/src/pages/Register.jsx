import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInformations = {
      firstname: firstNameRef.current.value,
      lastname: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const newErrors = {};
    if (!userInformations.firstname) {
      newErrors.firstname = "Le prénom est obligatoire";
    } else if (userInformations.firstname.length < 2) {
      newErrors.firstname = "Le prénom doit faire au moins 2 caractères";
    }
    if (!userInformations.lastname) {
      newErrors.lastname = "Le nom est obligatoire";
    } else if (userInformations.lastname.length < 2) {
      newErrors.lastname = "Le nom doit faire au moins 2 caractères";
    }
    if (!userInformations.email) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/\S+@\S+\.\S+/.test(userInformations.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!userInformations.password.length) {
      newErrors.password = "Le mot de passe est obligatoire";
    } else if (userInformations.password.length < 8) {
      newErrors.password = "Le mot de passe doit faire au moins 8 caractères";
    }
    if (userInformations.password !== confirmPasswordRef.current.value) {
      newErrors.passwordConfirm = "Les mots de passe ne correspondent pas";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post("http://localhost:5000/users", userInformations);
        navigate("/login");
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
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-medium mb-4">Register</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="w-full border border-gray-400 p-2 rounded-lg"
            type="text"
            id="firstName"
            ref={firstNameRef}
          />
          {errors.firstname && (
            <p className="text-red-500 text-xs italic">{errors.firstname}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="w-full border border-gray-400 p-2 rounded-lg"
            type="text"
            id="lastName"
            ref={lastNameRef}
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs italic">{errors.lastname}</p>
          )}
        </div>

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

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="w-full border border-gray-400 p-2 rounded-lg"
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
          />
          {errors.passwordConfirm && (
            <p className="text-red-500 text-xs italic">
              {errors.passwordConfirm}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
}

export default Register;
