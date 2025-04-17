import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useLang from "../hooks/useLang";

export const Header = () => {
  const currentUserStorage = useLocalStorage("currentUser");
  const role = currentUserStorage.get().role;
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();

  function logout() {
    currentUserStorage.remove();
    navigate("/signIn");
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {role === "admin" && (
              <li>
                <Link to={"/admin/dashboard"}>{t("Dashboard")}</Link>
              </li>
            )}

            <li>
              <Link to={"/"}>{t("Home")}</Link>
            </li>
            <li>
              <Link to={"/products"}>{t("Products")}</Link>
            </li>
            <li>
              <Link to={"/cart"}>{t("Cart")}</Link>
            </li>
            <li>
              <button onClick={() => setLang(lang === "en" ? "ar" : "en")}>
                {lang === "en" ? "AR" : "EN"}
              </button>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl">Orderly .</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {role === "admin" && (
            <li>
              <Link to={"/admin/dashboard"}>{t("Dashboard")}</Link>
            </li>
          )}

          <li>
            <Link to={"/"}>{t("Home")}</Link>
          </li>
          <li>
            <Link to={"/products"}>{t("Products")}</Link>
          </li>
          <li>
            <Link to={"/cart"}>{t("Cart")}</Link>
          </li>
          <li>
            <button onClick={() => setLang(lang === "en" ? "ar" : "en")}>
              {lang === "en" ? "AR" : "EN"}
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-end" onClick={logout}>
        <button className="btn">{t("Logout")}</button>
      </div>
    </div>
  );
};
