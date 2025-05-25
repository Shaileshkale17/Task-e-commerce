import React from "react";

const Profile = ({ FullName, Email, Phone, Category, created_at }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h2>
      <div className="space-y-3">
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Full Name:</span>
          <p className="text-gray-800">{FullName}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Email:</span>
          <p className="text-gray-800">{Email}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Phone:</span>
          <p className="text-gray-800">{Phone}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Category:</span>
          <p className="text-gray-800">{Category}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Joined:</span>
          <p className="text-gray-800">
            {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
