import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";

const Header = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="navbar bg-base-100 text-base-content sticky top-0 z-50 font-semibold shadow-lg backdrop-blur-lg">
        <div className="navbar-start">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl hover:bg-primary hover:text-primary-content transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            <span className="font-bold text-primary">StockWorld</span>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-200 border-t-primary"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }
  const menuItems = (
    <>
      <li>
        <NavLink to="/manageInventory">Manage Inventory</NavLink>
      </li>
      <li>
        <NavLink to="/addProduct">Add Product</NavLink>
      </li>
      {/* <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li> */}
      <li>
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 text-base-content sticky top-0 z-50 font-semibold shadow-lg backdrop-blur-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden hover:bg-primary hover:text-primary-content"
          >
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
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
          >
            {menuItems}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl hover:bg-primary hover:text-primary-content transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          <span className="font-bold text-primary">StockWorld</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 space-x-2">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar hover:bg-primary hover:text-primary-content"
            >
              <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={`${user?.displayName || "User"} Avatar`}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      console.log(
                        "Avatar image failed to load:",
                        user.photoURL
                      );
                      // Hide the image and show fallback
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextElementSibling) {
                        (
                          e.currentTarget.nextElementSibling as HTMLElement
                        ).style.display = "flex";
                      }
                    }}
                    onLoad={() => {
                      console.log(
                        "Avatar image loaded successfully:",
                        user.photoURL
                      );
                    }}
                  />
                ) : null}
                <div
                  className={`bg-gradient-to-br from-primary to-primary-focus text-primary-content rounded-full w-full h-full flex items-center justify-center ${
                    user?.photoURL ? "hidden" : "flex"
                  }`}
                  style={{ display: user?.photoURL ? "none" : "flex" }}
                >
                  {user?.displayName ? (
                    <span className="text-sm font-bold uppercase">
                      {user.displayName.charAt(0)}
                    </span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu z-10 dropdown-content p-2 shadow-lg bg-base-100 rounded-box w-52 mt-4 border border-base-300"
            >
              <li className="menu-title">
                <span className="text-xs opacity-60">
                  Welcome, {user?.displayName || "User"}!
                </span>
              </li>
              <li>
                <NavLink
                  className="hover:bg-primary hover:text-primary-content transition-colors"
                  to="/myProducts"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.75 7.5h16.5-1.5L19.5 4.5a1.5 1.5 0 00-1.5-1.5h-12A1.5 1.5 0 004.5 4.5L3.75 7.5z"
                    />
                  </svg>
                  My Products
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("email");
                    toast.success("SignOut Successful");
                  }}
                  className="hover:bg-error hover:text-error-content transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            className="btn btn-primary gap-2 hover:shadow-lg transition-all"
            to="/login"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
