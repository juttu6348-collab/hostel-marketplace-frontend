import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import ROUTES from "../../constants/routes";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const { favouriteCount } = useMarketplace();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  function handleLogin() {
    navigate(ROUTES.LOGIN);
  }

  function handleCreateAccount() {
    navigate(ROUTES.REGISTER);
  }

  function handleLogout() {
    logout();
    setIsMobileMenuOpen(false);
    navigate(ROUTES.HOME);
  }

  function handleExploreHostels() {
    navigate(ROUTES.HOSTELS);
  }

  function getNavigationClass({ isActive }) {
    return isActive ? "navigation-link-active" : "";
  }

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link
          className="brand"
          to={ROUTES.HOME}
          aria-label="HostelHub homepage"
        >
          <span className="brand-icon" aria-hidden="true">
            H
          </span>

          <span className="brand-content">
            <span className="brand-name">HostelHub</span>

            <span className="brand-tagline">
              Find your next home
            </span>
          </span>
        </Link>

        <nav
          className="desktop-navigation"
          aria-label="Main navigation"
        >
          <NavLink
            className={getNavigationClass}
            to={ROUTES.HOSTELS}
          >
            Explore Hostels
          </NavLink>

          <NavLink
            className={getNavigationClass}
            to={ROUTES.FAVOURITES}
          >
            Favourites

            {favouriteCount > 0 && (
              <span className="header-favourite-count">
                {favouriteCount}
              </span>
            )}
          </NavLink>

          {user?.role === "owner" && (
            <NavLink
              className={getNavigationClass}
              to={ROUTES.OWNER_DASHBOARD}
            >
              Owner Dashboard
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              className={getNavigationClass}
              to={ROUTES.ADMIN_DASHBOARD}
            >
              Admin Dashboard
            </NavLink>
          )}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <Link
                className="header-account-link"
                to={ROUTES.ACCOUNT}
              >
                <span
                  className="header-user-avatar"
                  aria-hidden="true"
                >
                  {user.fullName.charAt(0).toUpperCase()}
                </span>

                <span className="header-user-name">
                  {user.fullName}
                </span>
              </Link>

              <button
                className="header-logout-button"
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className="login-button"
                type="button"
                onClick={handleLogin}
              >
                Log in
              </button>

              <button
                className="btn btn-primary signup-button"
                type="button"
                onClick={handleCreateAccount}
              >
                Create Account
              </button>
            </>
          )}
        </div>

        <button
          className={`mobile-menu-button ${
            isMobileMenuOpen
              ? "mobile-menu-button-open"
              : ""
          }`}
          type="button"
          aria-label={
            isMobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setIsMobileMenuOpen(
              (currentValue) => !currentValue,
            )
          }
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`mobile-menu-overlay ${
          isMobileMenuOpen
            ? "mobile-menu-overlay-visible"
            : ""
        }`}
        aria-hidden="true"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <nav
        className={`mobile-navigation ${
          isMobileMenuOpen
            ? "mobile-navigation-open"
            : ""
        }`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile-navigation-header">
          <div>
            <span className="section-eyebrow">
              Navigation
            </span>

            <strong>HostelHub Menu</strong>
          </div>

          <button
            className="mobile-navigation-close"
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="mobile-navigation-links">
          <button
            type="button"
            onClick={handleExploreHostels}
          >
            Explore Hostels
          </button>

          <NavLink
            className={getNavigationClass}
            to={ROUTES.FAVOURITES}
          >
            <span>Favourites</span>

            {favouriteCount > 0 && (
              <span className="mobile-favourite-count">
                {favouriteCount}
              </span>
            )}
          </NavLink>

          {isAuthenticated && (
            <NavLink
              className={getNavigationClass}
              to={ROUTES.ACCOUNT}
            >
              My Account
            </NavLink>
          )}

          {user?.role === "owner" && (
            <NavLink
              className={getNavigationClass}
              to={ROUTES.OWNER_DASHBOARD}
            >
              Owner Dashboard
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              className={getNavigationClass}
              to={ROUTES.ADMIN_DASHBOARD}
            >
              Admin Dashboard
            </NavLink>
          )}
        </div>

        <div className="mobile-navigation-actions">
          {isAuthenticated ? (
            <>
              <div className="mobile-user-card">
                <span
                  className="header-user-avatar"
                  aria-hidden="true"
                >
                  {user.fullName.charAt(0).toUpperCase()}
                </span>

                <div>
                  <strong>{user.fullName}</strong>
                  <span>{user.email}</span>
                </div>
              </div>

              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleLogin}
              >
                Log In
              </button>

              <button
                className="btn btn-primary"
                type="button"
                onClick={handleCreateAccount}
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;