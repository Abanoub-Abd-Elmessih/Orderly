import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function ProtectedRoute({ children }) {
  const currentUserStorage = useLocalStorage("currentUser");
  const user = currentUserStorage.get();

  if (!user) {
    return <Navigate to="/signIn" replace />;
  }

  return children;
}
