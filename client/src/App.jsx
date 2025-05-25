import React, { useEffect } from "react";
import Navber from "./components/Navber";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const { isLoginIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginIn) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isLoginIn, navigate]);

  return (
    <>
      <Navber />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
