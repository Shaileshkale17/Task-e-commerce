import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Profile from "../components/Profile";
const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [Data, SetData] = useState([]);
  // console.log(user.token);
  const Token = user?.token;
  console.log(Token);
  const APICall = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/users`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );
      if (res.status === 200) {
        console.log(res.data.data);
        SetData(res.data.data);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    APICall();
  }, []);
  console.log("Data", Data);
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Data.map((item, index) => (
          <Profile
            key={index}
            FullName={item.FullName}
            Category={item.Category_DataBase}
            Email={item.Email}
            Phone={item.Phone}
            created_at={item.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
