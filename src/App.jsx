import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import { Bounce, ToastContainer } from "react-toastify";
import Dashboard from "./admin/Dashboard";
import AdminRoute from "./routes/AdminRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Products from "./pages/Products";
import AddProducts from "./admin/AddProducts";
import DashboardOverview from "./admin/DashboardOverview";
import AdminProducts from "./admin/AdminProducts";
import AddProduct from "./admin/AddProducts";
import EditProductPage from "./admin/EditProductPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
      ],
    },

    {
      path: "/admin/dashboard",
      element: (
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardOverview />,
        },
        {
          path: "products",
          element: <AdminProducts />,
        },
        {
          path: "products/add",
          element: <AddProduct />,
        },
        {
          path: "products/edit/:id",
          element: <EditProductPage />,
        },
      ],
    },

    {
      path: "signUp",
      element: <SignUp />,
    },
    {
      path: "signIn",
      element: <SignIn />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default App;
