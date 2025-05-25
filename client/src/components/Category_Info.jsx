import React, { useEffect, useState } from "react";
const Category_Info = ({
  id,
  Name,
  status,
  UserId,
  created_at,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Category info</h2>
      <div className="space-y-3">
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Name:</span>
          <p className="text-gray-800">{Name}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Status:</span>
          <p className="text-gray-800">{status}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">UserId:</span>
          <p className="text-gray-800">{UserId}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Joined:</span>
          <p className="text-gray-800">
            {new Date(created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
            onClick={() => onEdit({ id, Name, status })}>
            Edit
          </button>
          <button
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category_Info;
