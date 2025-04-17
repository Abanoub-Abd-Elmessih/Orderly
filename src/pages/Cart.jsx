import React, { useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
  const { get, set } = useLocalStorage("cart");
  const [cartItems, setCartItems] = useState(get() || []);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isClearAll, setIsClearAll] = useState(false); // new state
  const modalRef = useRef(null);

  const openModal = (id = null, clearAll = false) => {
    setSelectedProductId(id);
    setIsClearAll(clearAll); // distinguish between single and all delete
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    setSelectedProductId(null);
    setIsClearAll(false);
  };

  const confirmDelete = () => {
    if (isClearAll) {
      set([]);
      setCartItems([]);
      toast.success("Cart cleared successfully.");
    } else {
      const updatedCart = cartItems.filter(
        (item) => item.id !== selectedProductId
      );
      set(updatedCart);
      setCartItems(updatedCart);
      toast.success("Product removed successfully.");
    }
    closeModal();
  };

  const updateQuantity = (id, amount) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    set(updatedCart);
    setCartItems(updatedCart);
  };

  const removeItem = (id) => {
    openModal(id, false);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="px-5 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto max-w-full">
            <table className="w-max min-w-full border border-gray-200 text-center">
              <thead>
                <tr>
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Quantity</th>
                  <th className="p-3 border">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-t transition">
                    <td className="p-3 border">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="p-3 border font-semibold">{item.name}</td>
                    <td className="p-3 border text-gray-600">{item.category}</td>
                    <td className="p-3 border font-bold">${item.price}</td>
                    <td className="p-3 border">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 border rounded disabled:opacity-50"
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 border">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right mt-6 text-xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <Link to={"/checkout"} className="btn btn-primary w-full">
              Continue to checkout
            </Link>
            <button
              onClick={() => openModal(null, true)} // show modal for clear all
              className="btn w-full bg-red-600 hover:bg-red-700"
            >
              Remove All
            </button>
          </div>
        </>
      )}

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">
            {isClearAll
              ? "Do you really want to clear your entire cart? This action cannot be undone."
              : "Do you really want to delete this product? This action cannot be undone."}
          </p>
          <div className="modal-action">
            <div className="flex gap-3">
              <button className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="btn bg-red-600/80 hover:bg-red-600 duration-300"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Cart;
