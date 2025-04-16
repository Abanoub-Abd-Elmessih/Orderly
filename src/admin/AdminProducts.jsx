import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const storedProducts = useLocalStorage("products");
  const getStoredProducts = storedProducts.get() || [];
  const [products, setProducts] = useState(getStoredProducts);
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    storedProducts.set(products);
  }, [products, storedProducts]);

  const openModal = (id) => {
    setSelectedProductId(id);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    setSelectedProductId(null);
  };

  const confirmDelete = () => {
    setProducts(products.filter((product) => product.id !== selectedProductId));
    closeModal();
    toast.success("product deleted successfully.");
  };

  return (
    <div>
      <h2 className="my-4 text-center font-semibold text-3xl">
        Admin Products Page
      </h2>
      <Link to="add">
        <button className="btn btn-primary w-full">Add New Product</button>
      </Link>
      <div className="mt-5 px-5 border-t">
        <table className="table">
          <thead>
            <tr>
              <th>Row</th>
              <th>Image</th>
              <th>Name</th>
              <th>category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-24 h-20 object-cover rounded hover:opacity-80 transition cursor-pointer"
                    onClick={() => setSelectedImage(product.imageUrl)}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price} $</td>
                <td className="flex gap-2">
                  <Link to={`edit/${product.id}`}>
                    <button className="btn bg-slate-600">Edit</button>
                  </Link>
                  <button
                    className="btn bg-red-600/80 hover:bg-red-600 duration-300"
                    onClick={() => openModal(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-full max-h-full rounded shadow-lg"
          />
        </div>
      )}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">
            Do you really want to delete this product? This action cannot be
            undone.
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

export default AdminProducts;
