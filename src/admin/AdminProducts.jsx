import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "react-toastify";
import useLang from "../hooks/useLang";

const AdminProducts = () => {
  const storedProducts = useLocalStorage("products");
  const getStoredProducts = storedProducts.get() || [];
  const [products, setProducts] = useState(getStoredProducts);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLang();


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
    toast.success(t("Product_deleted_successfully"));
  };

  return (
    <div>
      <h2 className="my-4 text-center font-semibold text-3xl">
        {t("Admin_Products_Page")}
      </h2>
      <Link to="add">
        <button className="btn btn-primary w-full">{t("Add_New_Product")}</button>
      </Link>
      <div className="mt-5 px-5 border-t">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>{t("Row")}</th>
                <th>{t("Image")}</th>
                <th>{t("Name")}</th>
                <th>{t("Category")}</th>
                <th>{t("Price")}</th>
                <th>{t("Actions")}</th>
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
                      <button className="btn bg-slate-600">{t("Edit")}</button>
                    </Link>
                    <button
                      className="btn bg-red-600/80 hover:bg-red-600 duration-300"
                      onClick={() => openModal(product.id)}
                    >
                      {t("Delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <h3 className="font-bold text-lg">{t("AreYouSure")}?</h3>
          <p className="py-4">
            {t("SureDelete")}
          </p>
          <div className="modal-action">
            <div className="flex gap-3">
              <button className="btn" onClick={closeModal}>
                {t("Cancel")}
              </button>
              <button
                className="btn bg-red-600/80 hover:bg-red-600 duration-300"
                onClick={confirmDelete}
              >
                {t("YesDelete")}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminProducts;
