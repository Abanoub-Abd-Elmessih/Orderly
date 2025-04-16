import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const getProductById = (id) => {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  return products.find((product) => product.id === parseInt(id));
};

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const currentProduct = getProductById(id);
    if (currentProduct) {
      setProduct(currentProduct);
    } else {
      navigate("/admin/dashboard/products");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product) return;

    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const updatedProducts = products.map((prod) =>
      prod.id === product.id ? product : prod
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    navigate("/admin/dashboard/products");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product?.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product?.price || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={product?.description || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
