import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function AdminRoute({ children }) {
  const currentUserStorage = useLocalStorage("currentUser");
  const user = currentUserStorage.get();

  if (!user) {
    return <Navigate to="/signIn" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
