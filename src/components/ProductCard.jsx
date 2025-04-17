import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { get, set } = useLocalStorage("cart");

  const handleAddToCart = () => {
    const currentCart = get() || [];

    const existingItem = currentCart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }

    set(updatedCart);
    toast.success("Product added to cart successfully!");
  };

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col justify-between">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover mb-4 rounded cursor-pointer"
        />
      </Link>

      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-base font-bold">${product.price}</p>

      <button onClick={handleAddToCart} className="mt-4 btn btn-primary">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
