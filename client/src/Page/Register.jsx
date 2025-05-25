import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import Input from "../components/Input";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    Email: "",
    Password: "",
    Phone: "",
    FullName: "",
    Category_DataBase: "",
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
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        form
      );
      console.log(res);
      if (res.status === 201) {
        // dispatch(login(res.data));
        window.location.replace("/");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4">
      <form
        onSubmit={submitForm}
        className="flex flex-col h-[90%] border w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 pt-7 items-center rounded-lg">
        <h1 className="text-4xl font-bold">Register User</h1>

        <div className="flex flex-col justify-center items-center mt-11 gap-3 w-full px-4 sm:px-6">
          <Input
            Title="FullName"
            getData={form.FullName}
            setData={handleChange("FullName")}
          />
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
          <Input
            Title="Phone"
            getData={form.Phone}
            setData={handleChange("Phone")}
          />
          <Input
            Title="Category"
            getData={form.Category_DataBase}
            setData={handleChange("Category_DataBase")}
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

export default Register;
