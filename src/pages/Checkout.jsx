import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLang from "../hooks/useLang";

const Checkout = () => {
  const { get, set } = useLocalStorage("cart");
  const [cartItems] = React.useState(get() || []);
  const navigate = useNavigate();
  const { t } = useLang();


  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
useEffect(()=>{
if(get().length <= 0){
  navigate("/cart")
}
},[get, navigate])
  const handleConfirmOrder = () => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
    set([]);
    toast.success(t("Order_confirmed_successfully"));
    navigate("/orders");
  };

  return (
    <div className="px-5 py-10 max-w-3xl lg:mx-auto my-10 mx-3 border-2 border-gray-500 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center  mb-8">{t("checkout")}</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-center">{t("empty_cart")}</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b py-4 text-lg  "
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span className="font-semibold">{item.name} x {item.quantity}</span>
                </div>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          
          <div className="text-right text-xl font-bold mt-6">
            <span className="">{t("Total")}: </span>
            <span className="text-green-600">${totalPrice.toFixed(2)}</span>
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <button
              onClick={handleConfirmOrder}
              className="btn btn-primary w-full sm:w-auto py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              {t("Confirm_Order")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
