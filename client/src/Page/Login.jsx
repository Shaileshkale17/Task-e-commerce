import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import Input from "../components/Input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        form
      );
      if (res.status === 200) {
        dispatch(login(res.data));
        navigate("/home");
        // window.location.replace("/home");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4">
      <form
        onSubmit={submitForm}
        className="flex flex-col h-[60%] border w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 pt-7 items-center rounded-lg">
        <h1 className="text-4xl font-bold">Login</h1>

        <div className="flex flex-col justify-center items-center mt-11 gap-3 w-full px-4 sm:px-6">
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
