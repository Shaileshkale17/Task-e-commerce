import React from "react";

const Input = ({ Title, type, setData, getData }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={Title}>{Title}</label>
      <input
        className="w-72 py-1 px-3 border rounded"
        type={type || "text"}
        name={name}
        id={name}
        onChange={(e) => setData(e.target.value)}
        value={getData}
        // placeholder={`Enter your ${Title.toLowerCase()}`}
      />
    </div>
  );
};

export default Input;
