import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "react-toastify";
import useLang from "../hooks/useLang";

const AddProduct = () => {
  const { get, set } = useLocalStorage("products");
  const navigate = useNavigate();
  const { t } = useLang();

  const [product, setProduct] = useState({
    id: new Date().getTime(),
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });

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

    const currentProducts = get() || [];
    const updatedProducts = [...currentProducts, product];
    set(updatedProducts);
    toast.success(t("Product_Added_Successfully"));
    navigate("/admin/dashboard/products");
  };

  return (
    <div className="mt-5">
      <h2 className="mb-4 text-center font-semibold text-3xl">
        {t("Add_New_Product")}
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

        <label className="font-semibold">{t("Upload_Image")}</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-3 rounded-lg bg-transparent border-2 border-gray-400"
        />

        <label className="font-semibold">{t("Or_Enter_Image_URL")}</label>
        <input
          type="text"
          name="imageUrl"
          value={
            product.imageUrl.startsWith("data:image/") ? "" : product.imageUrl
          }
          onChange={handleChange}
          placeholder="Enter image URL"
          className="p-3 rounded-lg bg-transparent border-2 border-gray-400"
        />

        <button type="submit" className="btn btn-primary w-100">
          {t("Add_New_Product")}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
