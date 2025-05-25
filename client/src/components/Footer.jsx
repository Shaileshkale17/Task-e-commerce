import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="text-white bg-gray-500 text-center md:text-base text-sm w-full font-medium py-4">
      <p>
        All Copyright Reserved By ©{" "}
        <Link to="https://protfolio-shailesh-full-stack-developer.vercel.app/">
          Shailesh Kale
        </Link>
      </p>
    </div>
  );
};

export default Footer;
