import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <section className="site-footer-brand">
          <Link
            className="site-footer-logo"
            to="/"
            aria-label="HostelHub home"
          >
            HostelHub
          </Link>

          <p>
            Find and compare verified hostel listings,
            explore available rooms, and submit booking
            requests from one convenient marketplace.
          </p>
        </section>

        <nav
          className="site-footer-column"
          aria-labelledby="footer-marketplace-heading"
        >
          <h2 id="footer-marketplace-heading">
            Marketplace
          </h2>

          <Link to="/hostels">
            Browse Hostels
          </Link>

          <Link to="/how-it-works">
            How It Works
          </Link>

          <Link to="/about">
            About Us
          </Link>
        </nav>

        <nav
          className="site-footer-column"
          aria-labelledby="footer-support-heading"
        >
          <h2 id="footer-support-heading">
            Help and Safety
          </h2>

          <Link to="/safety-guidelines">
            Safety Guidelines
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/privacy-policy">
            Privacy Policy
          </Link>

          <Link to="/terms-and-conditions">
            Terms and Conditions
          </Link>
        </nav>

        <section className="site-footer-column">
          <h2>Contact</h2>

          <a href="mailto:support@hostelhub.demo">
            support@hostelhub.demo
          </a>

          <a href="tel:+923001234567">
            +92 300 1234567
          </a>

          <p>
            Islamabad, Pakistan
          </p>
        </section>
      </div>

      <div className="site-footer-bottom">
        <div className="container site-footer-bottom-content">
          <p>
            © {currentYear} HostelHub. All rights reserved.
          </p>

          <p>
            Frontend marketplace demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;