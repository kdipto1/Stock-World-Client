import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { NavLink, Link, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import Logo from "../../components/Logo";
import LoadingSpinner from "../../components/LoadingSpinner";
import { authService } from "../../services/authService";

import { User } from "firebase/auth";
import { useEffect, useState } from "react";

interface NavLinksProps {
  onNavigate?: () => void;
}

const NavLinks = ({ onNavigate }: NavLinksProps) => (
  <>
    <li>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={onNavigate}
      >
        Dashboard
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/manageInventory"
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={onNavigate}
      >
        <span className="hidden sm:inline">Manage Inventory</span>
        <span className="sm:hidden">Inventory</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/addProduct"
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={onNavigate}
      >
        <span className="hidden sm:inline">Add Product</span>
        <span className="sm:hidden">Add</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/blogs"
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={onNavigate}
      >
        Blogs
      </NavLink>
    </li>
  </>
);

interface UserMenuProps {
  user: User;
  onSignOut: () => void;
}

const UserMenu = ({ user, onSignOut }: UserMenuProps) => {
  const [imgError, setImgError] = useState(false);
  console.log(user);
  const fallbackName =
    user?.displayName || user?.email?.split("@")[0] || "User";
  const initial = fallbackName.charAt(0).toUpperCase();

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        className="btn btn-ghost btn-circle avatar"
        aria-haspopup="menu"
        aria-label="Open user menu"
      >
        <div className="w-10 rounded-full" title={fallbackName}>
          {user?.photoURL && !imgError ? (
            <img
              src={user.photoURL}
              alt={`${fallbackName} avatar`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-content">
              <span>{initial}</span>
            </div>
          )}
        </div>
      </button>
      <ul
        role="menu"
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li className="menu-title">
          <span>Welcome, {fallbackName}</span>
        </li>
        <li>
          <NavLink to="/myProducts" role="menuitem">
            My Products
          </NavLink>
        </li>
        <li>
          <button onClick={onSignOut} role="menuitem">
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [serverAuthed, setServerAuthed] = useState<boolean>(authService.isAuthenticated());
  const [serverEmail, setServerEmail] = useState<string | undefined>(authService.getUserEmail() || undefined);

  // Sync server-auth state when Firebase auth changes
  useEffect(() => {
    setServerAuthed(authService.isAuthenticated());
    setServerEmail(authService.getUserEmail() || undefined);
  }, [user]);

  // Also re-check when route changes (same-tab logins navigate)
  useEffect(() => {
    setServerAuthed(authService.isAuthenticated());
    setServerEmail(authService.getUserEmail() || undefined);
  }, [location]);

  // Listen to localStorage changes (e.g., other tabs)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "accessToken" || e.key === "email") {
        setServerAuthed(authService.isAuthenticated());
        setServerEmail(authService.getUserEmail() || undefined);
      }
    };
    const onAuthChanged = () => {
      setServerAuthed(authService.isAuthenticated());
      setServerEmail(authService.getUserEmail() || undefined);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onAuthChanged as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onAuthChanged as EventListener);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      authService.logout();
      setServerAuthed(false);
      setServerEmail(undefined);
      toast.success("Signed out successfully");
    } catch (err) {
      toast.error("Failed to sign out");
      console.error(err);
    }
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
        <div className={`dropdown ${mobileOpen ? "dropdown-open" : ""}`}>
          <button
            type="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Open navigation menu"
            aria-haspopup="menu"
            aria-expanded={mobileOpen}
            aria-controls="main-menu"
            onClick={() => setMobileOpen((o) => !o)}
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
          </button>
          <ul
            id="main-menu"
            role="menu"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            onClick={() => setMobileOpen(false)}
          >
            <NavLinks onNavigate={() => setMobileOpen(false)} />
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
        ) : serverAuthed ? (
          <div className="dropdown dropdown-end">
            <button
              type="button"
              className="btn btn-ghost btn-circle avatar"
              aria-haspopup="menu"
              aria-label="Open user menu"
            >
              {(() => {
                const fallbackName = serverEmail?.split("@")[0] || "User";
                const initial = fallbackName.charAt(0).toUpperCase();
                return (
                  <div className="w-10 rounded-full" title={fallbackName}>
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-content">
                      <span>{initial}</span>
                    </div>
                  </div>
                );
              })()}
            </button>
            <ul
              role="menu"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="menu-title">
                <span>Welcome, {serverEmail?.split("@")[0] || "User"}</span>
              </li>
              <li>
                <NavLink to="/myProducts" role="menuitem">
                  My Products
                </NavLink>
              </li>
              <li>
                <button onClick={handleSignOut} role="menuitem">
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
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
