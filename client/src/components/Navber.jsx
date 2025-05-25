import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
const Navber = () => {
  const { isLoginIn, user } = useSelector((state) => state.auth);
  const Dispatch = useDispatch();
  const LogoutFun = () => {
    Dispatch(logout());
    window.location.replace("/");
  };

  return (
    <div className="flex flex-row justify-between text-white bg-gray-500 text-center md:text-base text-sm w-full font-medium p-4">
      <p>E-commerce</p>
      {isLoginIn && (
        <ul className="flex flex-row gap-6">
          <li>{user?.user?.FullName}</li>
          <li onClick={LogoutFun} className="cursor-pointer">
            Login
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navber;
