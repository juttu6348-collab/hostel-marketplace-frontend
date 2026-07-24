import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import HostelCard from "../../components/hostel/HostelCard";
import { useMarketplace } from "../../context/MarketplaceContext";
import hostels from "../../data/hostels";
import ROUTES from "../../constants/routes";
import EmptyState from "../../components/common/EmptyState";
import "./FavouritesPage.css";

function FavouritesPage() {
  const {
    favouriteHostelIds,
    favouriteCount,
  } = useMarketplace();

  const favouriteHostels = hostels.filter((hostel) =>
    favouriteHostelIds.includes(hostel.id),
  );

  return (
    <>
      <Header />

      <main className="favourites-page">
        <section className="favourites-banner">
          <div className="container">
            <span className="section-eyebrow">
              Saved accommodation
            </span>

            <h1>Your favourite hostels</h1>

            <p>
              Review and compare the hostel listings you have saved.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="favourites-toolbar">
              <div>
                <strong>{favouriteCount}</strong>

                <span>
                  {favouriteCount === 1
                    ? "saved hostel"
                    : "saved hostels"}
                </span>
              </div>

              <Link
                className="btn btn-secondary"
                to={ROUTES.HOSTELS}
              >
                Explore More Hostels
              </Link>
            </div>

            {favouriteHostels.length > 0 ? (
              <div className="favourites-grid">
                {favouriteHostels.map((hostel) => (
                  <HostelCard hostel={hostel} key={hostel.id} />
                ))}
              </div>
            ) : (
              <div className="favourites-empty-state card">
              {favouriteHostels.length === 0 && (
  <EmptyState
    icon="♡"
    title="No favourite hostels yet"
    message="Save the hostels you like, and they will appear here for easy comparison."
    actionLabel="Explore Hostels"
    actionLink="/hostels"
  />
)}

                <Link
                  className="btn btn-primary"
                  to={ROUTES.HOSTELS}
                >
                  Find Hostels
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default FavouritesPage;