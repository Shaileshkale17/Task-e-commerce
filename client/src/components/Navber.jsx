import React from "react";

const Navber = () => {
  return (
    <div className="flex flex-row justify-between text-white bg-gray-500 text-center md:text-base text-sm w-full font-medium p-4">
      <p>E-commerce</p>
      <ul className="flex flex-row gap-6">
        <li>UserName</li>
        <li>Login</li>
      </ul>
    </div>
  );
};

export default Navber;
