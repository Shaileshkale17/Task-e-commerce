import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Category_Info from "../components/Category_Info";

const Category = () => {
  const { user } = useSelector((state) => state.auth);
  const [Data, SetData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    status: "Active",
    id: null,
  });

  const Token = user?.token;

  const APICall = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/category`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );
      if (res.status === 200) {
        SetData(res.data);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Fetch failed");
    }
  };

  const handleAddOrUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const isUpdate = !!formData.id;
      const url = isUpdate
        ? `${import.meta.env.VITE_BACKEND_URL}/category/${formData.id}`
        : `${import.meta.env.VITE_BACKEND_URL}/category`;

      const method = isUpdate ? "put" : "post";

      const res = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${Token}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(
          `Category ${isUpdate ? "updated" : "added"} successfully`
        );
        setShowModal(false);
        setFormData({ Name: "", status: "Active", id: null });
        APICall();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (item) => {
    setFormData({ Name: item.Name, status: item.status, id: item.id });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/category/${id}`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );
      if (res.status === 200) {
        toast.success("Category deleted successfully");
        APICall();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    APICall();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category</h1>
        <button
          onClick={() => {
            setFormData({ Name: "", status: "Active", id: null });
            setShowModal(true);
          }}
          className="border p-2 hover:bg-black hover:text-white rounded">
          Add Category
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[#4745455e] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {formData.id ? "Edit Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleAddOrUpdateCategory} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={formData.Name}
                  onChange={(e) =>
                    setFormData({ ...formData, Name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Status</label>
                <select
                  className="w-full border p-2 rounded"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }>
                  <option value="Active">Active</option>
                  <option value="inActive">inActive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  {formData.id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Data?.map((item, index) => (
          <Category_Info
            key={index}
            id={item?.id}
            Name={item?.Name}
            status={item?.status}
            UserId={item?.UserId}
            created_at={item?.created_at}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
