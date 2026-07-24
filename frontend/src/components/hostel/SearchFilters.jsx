import "./SearchFilters.css";

function SearchFilters({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  function handleInputChange(event) {
    const { name, value } = event.target;

    onFilterChange(name, value);
  }

  return (
    <aside className="search-filters card">
      <div className="search-filters-header">
        <div>
          <span className="section-eyebrow">Refine results</span>
          <h2>Search filters</h2>
        </div>

        <button
          className="clear-filters-button"
          type="button"
          onClick={onClearFilters}
        >
          Clear all
        </button>
      </div>

      <div className="filter-group">
        <label htmlFor="filterLocation">Location or institution</label>

        <input
          id="filterLocation"
          name="location"
          type="text"
          value={filters.location}
          placeholder="Islamabad, NUST, H-13..."
          onChange={handleInputChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="filterHostelType">Hostel type</label>

        <select
          id="filterHostelType"
          name="hostelType"
          value={filters.hostelType}
          onChange={handleInputChange}
        >
          <option value="">All hostel types</option>
          <option value="boys">Boys hostel</option>
          <option value="girls">Girls hostel</option>
          <option value="co-living">Co-living hostel</option>
          <option value="working-professionals">
            Working professionals
          </option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filterBudget">Maximum monthly budget</label>

        <select
          id="filterBudget"
          name="budget"
          value={filters.budget}
          onChange={handleInputChange}
        >
          <option value="">Any budget</option>
          <option value="10000">Up to PKR 10,000</option>
          <option value="15000">Up to PKR 15,000</option>
          <option value="20000">Up to PKR 20,000</option>
          <option value="30000">Up to PKR 30,000</option>
          <option value="50000">Up to PKR 50,000</option>
        </select>
      </div>

      <div className="filter-summary">
        <h3>Current search</h3>

        <dl>
          <div>
            <dt>Location</dt>
            <dd>{filters.location || "Any location"}</dd>
          </div>

          <div>
            <dt>Hostel type</dt>
            <dd>{filters.hostelTypeLabel || "All types"}</dd>
          </div>

          <div>
            <dt>Budget</dt>
            <dd>{filters.budgetLabel || "Any budget"}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}

export default SearchFilters;