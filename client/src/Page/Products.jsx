// Products.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Products_Info from "../components/Products_Info";

const Products = () => {
  const { user } = useSelector((state) => state.auth);
  const [Data, SetData] = useState([]);
  const [DataCategory, SetDataCategory] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    status: "Active",
    Category_Name: "",
    Price: 0,
    id: null,
  });

  const Token = user?.token;

  const APICall = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products`,
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

  const CategoryAPICall = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/category`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );
      if (res.status === 200 && Array.isArray(res.data)) {
        const userId = user?.user?.id;
        const filtered = res.data.filter((item) => item.UserId == userId);
        SetDataCategory(filtered);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Fetch failed");
    }
  };

  const handleAddProducts = async (e) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_BACKEND_URL}/products${
      formData.id ? `/${formData.id}` : ""
    }`;
    const method = formData.id ? "put" : "post";

    try {
      const res = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${Token}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(
          `Product ${formData.id ? "updated" : "added"} successfully`
        );
        setShowModal(false);
        setFormData({
          Name: "",
          status: "Active",
          Price: 0,
          Category_Name: "",
          id: null,
        });
        APICall();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );
      if (res.status === 200) {
        toast.success("Product deleted successfully");
        APICall();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      Name: product.Name,
      Price: product.Price,
      Category_Name: product.CategoryName,
      status: product.status,
      id: product.id,
    });
    setShowModal(true);
  };

  useEffect(() => {
    APICall();
    CategoryAPICall();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="border p-2 hover:bg-black hover:text-white rounded">
          Add Products
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[#4745455e] flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {formData.id ? "Update Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleAddProducts} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 rounded"
                value={formData.Name}
                onChange={(e) =>
                  setFormData({ ...formData, Name: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full border p-2 rounded"
                value={formData.Price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Price: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
              <select
                className="w-full border p-2 rounded"
                value={formData.Category_Name}
                onChange={(e) =>
                  setFormData({ ...formData, Category_Name: e.target.value })
                }>
                <option value="">Select Category</option>
                {DataCategory.map((item) => (
                  <option key={item.Name} value={item.Name}>
                    {item.Name}
                  </option>
                ))}
              </select>
              <select
                className="w-full border p-2 rounded"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }>
                <option value="Active">Active</option>
                <option value="inActive">inActive</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      Name: "",
                      status: "Active",
                      Price: 0,
                      Category_Name: "",
                      id: null,
                    });
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
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
        {Data.map((item) => (
          <Products_Info
            key={item?.id}
            id={item?.id}
            CategoryName={item?.CategoryName}
            Name={item?.Name}
            Price={item?.Price}
            UserId={item?.UserId}
            created_at={item?.created_at}
            status={item?.status}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
