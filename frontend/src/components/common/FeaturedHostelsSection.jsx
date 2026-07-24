import hostels from "../../data/hostels";
import HostelCard from "../hostel/HostelCard";
import "./FeaturedHostelsSection.css";

function FeaturedHostelsSection() {
  const featuredHostels = hostels.filter((hostel) => hostel.featured);

  function handleViewAll() {
    console.log("View all hostels clicked");
  }

  return (
    <section className="section featured-hostels-section" id="hostels">
      <div className="container">
        <div className="featured-hostels-header">
          <div className="section-heading">
            <span className="section-eyebrow">Recommended accommodation</span>

            <h2 className="section-title">Featured hostels near you</h2>

            <p className="section-description">
              Explore selected hostel listings with clear pricing, facilities,
              ratings and room availability.
            </p>
          </div>

          <button
            className="btn btn-secondary view-all-button"
            type="button"
            onClick={handleViewAll}
          >
            View All Hostels
          </button>
        </div>

        {featuredHostels.length > 0 ? (
          <div className="hostels-grid">
            {featuredHostels.map((hostel) => (
              <HostelCard hostel={hostel} key={hostel.id} />
            ))}
          </div>
        ) : (
          <div className="empty-hostels-state card">
            <h3>No featured hostels available</h3>
            <p>Please check again later for newly added hostel listings.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedHostelsSection;