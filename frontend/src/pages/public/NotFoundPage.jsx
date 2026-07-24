import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <span className="not-found-code">
          404
        </span>

        <h1>Page not found</h1>

        <p>
          The page you are looking for does not exist,
          may have moved, or the address may be incorrect.
        </p>

        <div className="not-found-actions">
          <Link
            className="btn btn-primary"
            to="/"
          >
            Return Home
          </Link>

          <Link
            className="btn btn-secondary"
            to="/hostels"
          >
            Browse Hostels
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;