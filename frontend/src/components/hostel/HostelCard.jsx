import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMarketplace } from "../../context/MarketplaceContext";
import formatCurrency from "../../utils/formatCurrency";
import { getHostelDetailsRoute } from "../../constants/routes";
import "./HostelCard.css";

function HostelCard({ hostel }) {
  const navigate = useNavigate();

  const {
    isFavourite,
    toggleFavourite,
  } = useMarketplace();

  const [imageFailed, setImageFailed] = useState(false);

  const favourite = isFavourite(hostel.id);

  function handleFavouriteClick() {
    toggleFavourite(hostel.id);
  }

  function handleViewDetails() {
    navigate(getHostelDetailsRoute(hostel.id));
  }

  return (
    <article className="hostel-card card">
      <div className="hostel-card-image-wrapper">
        {!imageFailed ? (
          <img
            className="hostel-card-image"
            src={hostel.image}
            alt={`${hostel.name} accommodation`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="hostel-image-fallback">
            <span>Hostel Image</span>
          </div>
        )}

        <div className="hostel-card-badges">
          {hostel.verified && (
            <span className="hostel-badge verified-badge">
              Verified
            </span>
          )}

          {hostel.availableBeds > 0 && (
            <span className="hostel-badge availability-badge">
              {hostel.availableBeds} beds available
            </span>
          )}
        </div>

        <button
          className={`favourite-button ${
            favourite ? "favourite-button-active" : ""
          }`}
          type="button"
          aria-label={
            favourite
              ? `Remove ${hostel.name} from favourites`
              : `Add ${hostel.name} to favourites`
          }
          aria-pressed={favourite}
          onClick={handleFavouriteClick}
        >
          <span aria-hidden="true">
            {favourite ? "♥" : "♡"}
          </span>
        </button>
      </div>

      <div className="hostel-card-content">
        <div className="hostel-card-location">
          <span>{hostel.area}</span>
          <span aria-hidden="true">•</span>
          <span>{hostel.city}</span>
        </div>

        <h3 className="hostel-card-title">{hostel.name}</h3>

        <p className="hostel-card-distance">
          {hostel.distance}
        </p>

        <div className="hostel-card-rating">
          <span className="rating-star" aria-hidden="true">
            ★
          </span>

          <strong>{hostel.rating}</strong>

          <span>
            {hostel.reviewCount}{" "}
            {hostel.reviewCount === 1 ? "review" : "reviews"}
          </span>
        </div>

        <div className="hostel-card-details">
          <div>
            <span className="detail-label">Hostel type</span>

            <span className="detail-value">
              {hostel.hostelTypeLabel}
            </span>
          </div>

          <div>
            <span className="detail-label">Room type</span>

            <span className="detail-value">
              {hostel.roomType}
            </span>
          </div>
        </div>

        <div className="hostel-facilities">
          {hostel.facilities.slice(0, 4).map((facility) => (
            <span className="facility-tag" key={facility}>
              {facility}
            </span>
          ))}
        </div>

        <div className="hostel-card-footer">
          <div className="hostel-price">
            <span>Starting from</span>

            <strong>
              {formatCurrency(hostel.price)}
              <small>/month</small>
            </strong>
          </div>

          <button
            className="btn btn-primary view-details-button"
            type="button"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

export default HostelCard;