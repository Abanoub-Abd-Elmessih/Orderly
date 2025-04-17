import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { get: getProducts } = useLocalStorage("products");
  const { get: getCart, set: setCart } = useLocalStorage("cart");

  const products = getProducts() || [];
  console.log("Available products in cart:", products);

  const product = products.find((item) => item.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, imageUrl, price, description } = product;

  const addToCart = () => {
    const cartItems = getCart() || [];
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    setCart(cartItems);
    toast.success("Product added to cart!");
  };

  return (
    <div className="px-5 py-10 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">{name}</h2>
      <div className="flex flex-col sm:flex-row gap-5 lg:gap-10 border p-5 rounded-lg">
        <div className="w-full sm:w-1/2">
          <img
            src={imageUrl}
            alt={name}
            className="w-full object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <div className="">
            <p className="text-2xl font-bold mb-4">{name}</p>
            <p className="text-xl font-semibold mb-4">${price}</p>
            <p className="mb-4">{description}</p>
          </div>
          <div className="">
            <button
              onClick={addToCart}
              className="btn btn-primary w-full py-3 mt-6"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn btn-outline mt-3 w-full py-3"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
