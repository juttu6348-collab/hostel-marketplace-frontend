import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import BookingHistory from "../../components/booking/BookingHistory";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import ROUTES from "../../constants/routes";
import "./AccountPage.css";

function AccountPage() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const {
    favouriteCount,
    currentUserBookings,
  } = useMarketplace();

  const pendingBookingCount =
    currentUserBookings.filter(
      (booking) => booking.status === "pending",
    ).length;

  function handleLogout() {
    logout();

    navigate(ROUTES.HOME, {
      replace: true,
    });
  }

  return (
    <>
      <Header />

      <main className="account-page">
        <section className="account-banner">
          <div className="container">
            <span className="section-eyebrow">
              Your account
            </span>

            <h1>Welcome, {user.fullName}</h1>

            <p>
              Manage your profile, saved hostels and booking
              activity from one place.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container account-layout">
            <aside className="account-sidebar card">
              <div
                className="account-avatar"
                aria-hidden="true"
              >
                {user.fullName.charAt(0).toUpperCase()}
              </div>

              <h2>{user.fullName}</h2>
              <p>{user.email}</p>

              <span className="account-role">
                {user.role === "owner"
                  ? "Hostel owner"
                  : "Hostel seeker"}
              </span>

              <button
                className="btn btn-secondary account-logout-button"
                type="button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </aside>

            <div className="account-content">
              <section className="account-section card">
                <div className="account-section-heading">
                  <span className="section-eyebrow">
                    Profile information
                  </span>

                  <h2>Account details</h2>
                </div>

                <dl className="account-details-list">
                  <div>
                    <dt>Full name</dt>
                    <dd>{user.fullName}</dd>
                  </div>

                  <div>
                    <dt>Email address</dt>
                    <dd>{user.email}</dd>
                  </div>

                  <div>
                    <dt>Mobile number</dt>
                    <dd>
                      {user.phoneNumber || "Not provided"}
                    </dd>
                  </div>

                  <div>
                    <dt>Account role</dt>
                    <dd>
                      {user.role === "admin"
  ? "Platform administrator"
  : user.role === "owner"
    ? "Hostel owner"
    : "Hostel seeker"}
                    </dd>
                  </div>

                  {user.role === "owner" && (
                    <div>
                      <dt>Hostel name</dt>
                      <dd>
                        {user.hostelName || "Not provided"}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>

              <section className="account-section card">
                <div className="account-section-heading">
                  <span className="section-eyebrow">
                    Marketplace activity
                  </span>

                  <h2>Your activity summary</h2>
                </div>

                <div className="account-stat-grid">
                  <article>
                    <strong>{favouriteCount}</strong>
                    <span>Saved hostels</span>
                  </article>

                  <article>
                    <strong>
                      {currentUserBookings.length}
                    </strong>
                    <span>Total booking requests</span>
                  </article>

                  <article>
                    <strong>{pendingBookingCount}</strong>
                    <span>Pending requests</span>
                  </article>
                </div>

                <div className="account-action-row">
                  <Link
                    className="btn btn-primary"
                    to={ROUTES.HOSTELS}
                  >
                    Explore Hostels
                  </Link>

                  <Link
                    className="btn btn-secondary"
                    to={ROUTES.FAVOURITES}
                  >
                    View Favourites
                  </Link>
                </div>
              </section>

              {user.role === "customer" && (
                <BookingHistory />
              )}

              {user.role === "admin" && (
  <section className="account-section card">
    <div className="account-section-heading">
      <span className="section-eyebrow">
        Administration
      </span>

      <h2>Manage the HostelHub platform</h2>

      <p>
        Review users, listings, booking activity and
        platform reports.
      </p>
    </div>

    <Link
      className="btn btn-primary"
      to={ROUTES.ADMIN_DASHBOARD}
    >
      Open Admin Dashboard
    </Link>
  </section>
)}

              {user.role === "owner" && (
  <section className="account-section card">
    <div className="account-section-heading">
      <span className="section-eyebrow">
        Owner dashboard
      </span>

      <h2>Manage your hostel business</h2>

      <p>
        Create listings, manage rooms and respond to customer
        booking requests.
      </p>
    </div>

    <Link
      className="btn btn-primary"
      to={ROUTES.OWNER_DASHBOARD}
    >
      Open Owner Dashboard
    </Link>
  </section>
)}
              
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default AccountPage;