import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Orders = () => {
  const { get } = useLocalStorage("orders");
  const orders = get() || [];

  return (
    <div className="px-5 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-4">Order #{index + 1}</h3>

              <ul className="divide-y">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="py-4 flex items-center justify-between space-x-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <span className="text-lg">{item.name} × {item.quantity}</span>
                    </div>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="text-right font-bold text-xl mt-4">
                Total: $
                {order.items
                  .reduce((acc, i) => acc + i.price * i.quantity, 0)
                  .toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
