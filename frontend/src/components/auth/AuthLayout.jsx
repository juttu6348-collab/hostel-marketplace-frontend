import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import "./AuthLayout.css";

function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}) {
  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <Link
          className="auth-brand"
          to={ROUTES.HOME}
          aria-label="Return to HostelHub homepage"
        >
          <span className="auth-brand-icon" aria-hidden="true">
            H
          </span>

          <span>
            <strong>HostelHub</strong>
            <small>Find your next home</small>
          </span>
        </Link>

        <div className="auth-brand-content">
          <span className="auth-brand-eyebrow">
            Pakistan’s hostel marketplace
          </span>

          <h2>
            Find, compare and request accommodation with
            confidence.
          </h2>

          <p>
            Explore clear hostel pricing, room availability,
            facilities and verified listing information in one
            platform.
          </p>

          <ul className="auth-benefits">
            <li>
              <span aria-hidden="true">✓</span>
              Search hostels near universities
            </li>

            <li>
              <span aria-hidden="true">✓</span>
              Compare rooms and monthly costs
            </li>

            <li>
              <span aria-hidden="true">✓</span>
              Manage favourites and booking requests
            </li>
          </ul>
        </div>

        <p className="auth-brand-disclaimer">
          Frontend demonstration. Secure account authentication
          will be connected during backend development.
        </p>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-container">
          <Link className="auth-back-link" to={ROUTES.HOME}>
            ← Return to homepage
          </Link>

          <header className="auth-form-header">
            <span className="section-eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </header>

          {children}

          <footer className="auth-form-footer">
            <span>{footerText}</span>

            <Link to={footerLinkTo}>{footerLinkText}</Link>
          </footer>
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;