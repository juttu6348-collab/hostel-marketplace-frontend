import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../../components/layout/Header";
import HostelCard from "../../components/hostel/HostelCard";
import SearchFilters from "../../components/hostel/SearchFilters";
import hostels from "../../data/hostels";
import ROUTES from "../../constants/routes";
import "./SearchResultsPage.css";

const hostelTypeLabels = {
  boys: "Boys Hostel",
  girls: "Girls Hostel",
  "co-living": "Co-Living Hostel",
  "working-professionals": "Working Professionals",
};

function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    hostelType: searchParams.get("type") || "",
    budget: searchParams.get("budget") || "",
  });

  useEffect(() => {
    setFilters({
      location: searchParams.get("location") || "",
      hostelType: searchParams.get("type") || "",
      budget: searchParams.get("budget") || "",
    });
  }, [searchParams]);

  const enhancedFilters = {
    ...filters,
    hostelTypeLabel:
      hostelTypeLabels[filters.hostelType] || "",
    budgetLabel: filters.budget
      ? `Up to PKR ${Number(filters.budget).toLocaleString("en-PK")}`
      : "",
  };

  const filteredHostels = useMemo(() => {
    const normalizedLocation = filters.location
      .trim()
      .toLowerCase();

    return hostels.filter((hostel) => {
      const searchableLocation = [
        hostel.name,
        hostel.city,
        hostel.area,
        hostel.nearbyInstitution,
        hostel.distance,
      ]
        .join(" ")
        .toLowerCase();

      const matchesLocation =
        !normalizedLocation ||
        searchableLocation.includes(normalizedLocation);

      const matchesType =
        !filters.hostelType ||
        hostel.hostelType === filters.hostelType;

      const matchesBudget =
        !filters.budget ||
        hostel.price <= Number(filters.budget);

      return matchesLocation && matchesType && matchesBudget;
    });
  }, [filters]);

  function updateUrl(nextFilters) {
    const nextSearchParams = new URLSearchParams();

    if (nextFilters.location.trim()) {
      nextSearchParams.set(
        "location",
        nextFilters.location.trim(),
      );
    }

    if (nextFilters.hostelType) {
      nextSearchParams.set("type", nextFilters.hostelType);
    }

    if (nextFilters.budget) {
      nextSearchParams.set("budget", nextFilters.budget);
    }

    setSearchParams(nextSearchParams);
  }

  function handleFilterChange(filterName, value) {
    const nextFilters = {
      ...filters,
      [filterName]: value,
    };

    setFilters(nextFilters);
    updateUrl(nextFilters);
  }

  function handleClearFilters() {
    const emptyFilters = {
      location: "",
      hostelType: "",
      budget: "",
    };

    setFilters(emptyFilters);
    setSearchParams({});
  }

  return (
    <>
      <Header />

      <main className="search-results-page">
        <section className="search-results-banner">
          <div className="container">
            <Link className="back-home-link" to={ROUTES.HOME}>
              ← Back to home
            </Link>

            <span className="section-eyebrow">
              Hostel marketplace
            </span>

            <h1>Find accommodation that matches your needs</h1>

            <p>
              Search and compare hostel listings using location, type
              and monthly budget.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container search-results-layout">
            <SearchFilters
              filters={enhancedFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />

            <div className="search-results-content">
              <div className="results-toolbar">
                <div>
                  <span className="results-count">
                    {filteredHostels.length}
                  </span>

                  <h2>
                    {filteredHostels.length === 1
                      ? "hostel found"
                      : "hostels found"}
                  </h2>
                </div>

                <p>
                  Results update automatically when filters change.
                </p>
              </div>

              {filteredHostels.length > 0 ? (
                <div className="search-results-grid">
                  {filteredHostels.map((hostel) => (
                    <HostelCard
                      hostel={hostel}
                      key={hostel.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-results-state card">
                  <div
                    className="no-results-icon"
                    aria-hidden="true"
                  >
                    ⌕
                  </div>

                  <h2>No matching hostels found</h2>

                  <p>
                    Try another city, increase your budget or remove
                    some filters.
                  </p>

                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default SearchResultsPage;