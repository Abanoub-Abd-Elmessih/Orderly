import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Home = () => {
  const navigate = useNavigate();
  const { remove } = useLocalStorage("currentUser");
  function logout() {
    remove();
    navigate("/signIn");
  }
  return (
    <div className="flex flex-col">
      <Link to={"/signIn"}>signIn</Link>
      <Link to={"/signUp"}>signUp</Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default Home;
