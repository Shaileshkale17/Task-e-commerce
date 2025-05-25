import React from "react";

const Products_Info = ({
  id,
  Name,
  CategoryName,
  status,
  Price,
  UserId,
  created_at,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Info</h2>
      <div className="space-y-3">
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Name:</span>
          <p className="text-gray-800">{Name}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Category Name:</span>
          <p className="text-gray-800">{CategoryName}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-gray-500 font-medium">Price:</span>
          <p className="text-gray-800">{Price}</p>
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
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() =>
            onEdit({ id, Name, Price, CategoryName: CategoryName, status })
          }>
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Products_Info;
