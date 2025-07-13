import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { NavLink, Link } from "react-router-dom";
import auth from "../../firebase.init";
import Logo from "../../components/Logo";
import LoadingSpinner from "../../components/LoadingSpinner";

import { User } from "firebase/auth";

const NavLinks = () => (
  <>
    <li>
      <NavLink to="/manageInventory">Manage Inventory</NavLink>
    </li>
    <li>
      <NavLink to="/addProduct">Add Product</NavLink>
    </li>
    <li>
      <NavLink to="/blogs">Blogs</NavLink>
    </li>
  </>
);

interface UserMenuProps {
  user: User;
  onSignOut: () => void;
}

const UserMenu = ({ user, onSignOut }: UserMenuProps) => (
  <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User Avatar" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-content">
            <span>{user?.displayName?.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
    </label>
    <ul
      tabIndex={0}
      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li className="menu-title">
        <span>Welcome, {user?.displayName || "User"}</span>
      </li>
      <li>
        <NavLink to="/myProducts">My Products</NavLink>
      </li>
      <li>
        <button onClick={onSignOut}>Sign Out</button>
      </li>
    </ul>
  </div>
);

const Header = () => {
  const [user, loading] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    toast.success("Signed out successfully");
  };

  if (loading) {
    return (
      <div className="navbar bg-base-100 sticky top-0 z-50">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <Logo />
            <span className="ml-2 font-bold">StockWorld</span>
          </Link>
        </div>
        <div className="flex-none">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <header className="navbar bg-base-100 sticky top-0 z-50 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <NavLinks />
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <Logo />
          <span className="ml-2 font-bold">StockWorld</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <NavLinks />
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <UserMenu user={user} onSignOut={handleSignOut} />
        ) : (
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;