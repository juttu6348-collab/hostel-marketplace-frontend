import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";
import "./HeroSection.css";

function HeroSection() {
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const location = formData.get("location")?.trim() || "";
    const hostelType = formData.get("hostelType") || "";
    const budget = formData.get("budget") || "";

    const searchParameters = new URLSearchParams();

    if (location) {
      searchParameters.set("location", location);
    }

    if (hostelType) {
      searchParameters.set("type", hostelType);
    }

    if (budget) {
      searchParameters.set("budget", budget);
    }

    const queryString = searchParameters.toString();

    navigate(
      queryString
        ? `${ROUTES.HOSTELS}?${queryString}`
        : ROUTES.HOSTELS,
    );
  }

  return (
    <section className="hero-section">
      <div className="hero-decoration hero-decoration-one" />
      <div className="hero-decoration hero-decoration-two" />

      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-badge">
            Trusted hostel discovery platform
          </span>

          <h1>
            Find a hostel that feels like
            <span> home.</span>
          </h1>

          <p className="hero-description">
            Search verified hostels near universities, colleges and workplaces.
            Compare rooms, facilities, prices and availability in one place.
          </p>

          <div className="hero-highlights">
            <span>Verified listings</span>
            <span>Clear monthly costs</span>
            <span>Student-friendly search</span>
          </div>
        </div>

        <form className="search-panel card" onSubmit={handleSearch}>
          <div className="search-panel-heading">
            <h2>Search available hostels</h2>
            <p>Enter your preferences to find suitable accommodation.</p>
          </div>

          <div className="search-fields">
            <div className="form-group location-field">
              <label htmlFor="location">City, area or university</label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="For example, Islamabad or NUST"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hostelType">Hostel type</label>

              <select id="hostelType" name="hostelType" defaultValue="">
                <option value="">All hostel types</option>
                <option value="boys">Boys hostel</option>
                <option value="girls">Girls hostel</option>
                <option value="co-living">Co-living hostel</option>
                <option value="working-professionals">
                  Working professionals
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="budget">Maximum monthly budget</label>

              <select id="budget" name="budget" defaultValue="">
                <option value="">Any budget</option>
                <option value="10000">Up to PKR 10,000</option>
                <option value="15000">Up to PKR 15,000</option>
                <option value="20000">Up to PKR 20,000</option>
                <option value="30000">Up to PKR 30,000</option>
                <option value="50000">Up to PKR 50,000</option>
              </select>
            </div>

            <button className="btn btn-primary search-button" type="submit">
              Search Hostels
            </button>
          </div>

          <p className="search-supporting-text">
            Popular searches: NUST, FAST Islamabad, COMSATS and University of
            Peshawar
          </p>
        </form>
      </div>
    </section>
  );
}

export default HeroSection;