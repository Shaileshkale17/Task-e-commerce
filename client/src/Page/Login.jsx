import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        form
      );
      console.log(res);
      if (res.status === 200) {
        dispatch(login(res.data));
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={submitForm}
        className="flex flex-col h-[60%] border w-[30%] pt-7 items-center rounded-lg">
        <h1 className="text-4xl font-bold">Login</h1>

        <div className="flex flex-col justify-center items-center mt-11 gap-3 w-full">
          <Input
            Title="Email"
            getData={form.Email}
            setData={handleChange("Email")}
          />
          <Input
            Title="Password"
            getData={form.Password}
            setData={handleChange("Password")}
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-5 border px-7 py-1.5 rounded hover:text-black text-white hover:bg-transparent bg-black">
            Login
          </button>
        </div>

        <Link to="/register" className="mt-7 text-blue-600 hover:text-blue-300">
          Create your account
        </Link>
      </form>
    </div>
  );
};

export default Login;
