import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  Box,
  HomeIcon,
  LayoutDashboard,
  ListOrdered,
  LogOutIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const Sidebar = ({ children }) => {
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const { remove } = useLocalStorage("currentUser");

  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
  };
    function logout() {
      remove();
      navigate("/signIn");
    }

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerRef}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-semibold">
            <Link to="/admin/dashboard">Orderly Dashboard.</Link>
          </div>
        </div>

        {/* Page content here */}
        <div className="p-4">{children}</div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="bg-base-200 h-full w-80 p-4 flex flex-col justify-between">
          <ul className="menu w-full">
            <p className="border-b-2 py-1 mb-2 font-bold text-center">
              Admin Dashboard
            </p>
            <li>
              <Link to="/admin/dashboard" onClick={closeDrawer} >
                <LayoutDashboard className="size-5" />
                Dashboard Overview
              </Link>
            </li>
            <li>
              <Link to="products" onClick={closeDrawer} >
                <Box className="size-5" />
                Products
              </Link>
            </li>
            <li>
              <Link to={"/orders"} onClick={closeDrawer} >
                <ListOrdered className="size-5" />
                Orders
              </Link>
            </li>
            <li>
              <Link to={"/"} onClick={closeDrawer} >
                <HomeIcon className="size-5" /> Home
              </Link>
            </li>
            <li>
              <Link to={"/"} onClick={closeDrawer} >
                <ShoppingCartIcon className="size-5" /> Cart
              </Link>
            </li>
          </ul>

          <div className="mt-4 border-t pt-4">
            <button
              onClick={logout}
              className="flex w-full items-center gap-2 text-red-500 hover:text-red-700"
            >
              <LogOutIcon className="size-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
