import React from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useLang from "../hooks/useLang";

const Home = () => {
  const { get } = useLocalStorage("products");
  const products = get();
  const featured = products?.slice(0, 4) || [];
  const { t } = useLang();

  return (
    <div className={`px-6 py-10 space-y-12`}>
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          {t("Welcome_Back_to")} Orderly 🛍️
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          {t("Our_Products")} - {t("Sort_by")} {t("Price_Low_to_High")} /{" "}
          {t("Price_High_to_Low")}
        </p>
        <Link to="/products">
          <button size="lg" className="mt-4 btn">
            {t("Continue_Shopping")}
          </button>
        </Link>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">{t("Our_Products")}</h2>
        {featured.length === 0 ? (
          <p className="text-center text-gray-500">{t("No_products_found")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <div
                key={product.id}
                className="border rounded-xl shadow-sm p-4 flex flex-col items-center"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-32 h-32 object-contain mb-2"
                />
                <h3 className="font-semibold text-center">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <span className="text-primary font-bold mt-2">
                  ${product.price}
                </span>
                <Link
                  to={`/products/${product.id}`}
                  className="text-blue-600 text-sm mt-2 hover:underline"
                >
                  {t("View")}
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
