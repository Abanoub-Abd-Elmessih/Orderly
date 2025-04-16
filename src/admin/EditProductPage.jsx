import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const current = products.find((p) => p.id === parseInt(id));
    if (!current) {
      navigate("/admin/dashboard/products");
    } else {
      setProduct(current);
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.imageUrl) {
      toast.warning("Please upload an image or enter an image URL.");
      return;
    }

    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const updatedProducts = products.map((p) =>
      p.id === product.id ? product : p
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Product Updated Successfully.");
    navigate("/admin/dashboard/products");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="mt-5">
      <h2 className="mb-4 text-center font-semibold text-3xl">
        Edit Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="card p-5 shadow flex flex-col gap-3 border-2 border-gray-700"
      >
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          placeholder="Enter product name"
          className="p-3 rounded-lg bg-transparent border-2 border-gray-400"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          placeholder="Enter category"
          className="p-3 rounded-lg bg-transparent border-2 border-gray-400"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          placeholder="Enter price"
          className="p-3 rounded-lg bg-transparent border-2 border-gray-400"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          placeholder="Enter product description"
          rows="4"
          className="p-3 rounded-lg bg-transparent border-2 border-gray-400"
        />

        <label className="font-semibold">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-3 rounded-lg bg-transparent border-2 border-gray-400"
        />

        <label className="font-semibold">Or Enter Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={
            product.imageUrl?.startsWith("data:image/") ? "" : product.imageUrl
          }
          onChange={handleChange}
          placeholder="Enter image URL"
          className="p-3 rounded-lg bg-transparent border-2 border-gray-400"
        />

        <button type="submit" className="btn btn-primary w-100">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
