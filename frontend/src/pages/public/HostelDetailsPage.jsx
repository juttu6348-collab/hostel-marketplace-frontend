import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/layout/Header";
import HostelGallery from "../../components/hostel/HostelGallery";
import RoomOptions from "../../components/hostel/RoomOptions";
import BookingSummary from "../../components/hostel/BookingSummary";
import hostels from "../../data/hostels";
import getHostelDetails from "../../utils/getHostelDetails";
import ROUTES from "../../constants/routes";
import "./HostelDetailsPage.css";

function HostelDetailsPage() {
  const { hostelId } = useParams();
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const hostel = useMemo(() => {
    const hostelRecord = hostels.find(
      (item) => item.id === Number(hostelId),
    );

    return getHostelDetails(hostelRecord);
  }, [hostelId]);

  if (!hostel) {
    return (
      <>
        <Header />

        <main className="hostel-not-found-page">
          <div className="container">
            <div className="hostel-not-found card">
              <span className="hostel-not-found-code">404</span>
              <h1>Hostel not found</h1>
              <p>
                The hostel listing you requested does not exist or may
                have been removed.
              </p>

              <Link className="btn btn-primary" to={ROUTES.HOSTELS}>
                Explore Available Hostels
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const selectedRoom = hostel.roomOptions.find(
    (room) => room.id === selectedRoomId,
  );

  function handleSelectFirstRoom() {
    const firstAvailableRoom = hostel.roomOptions.find(
      (room) => room.availableBeds > 0,
    );

    if (firstAvailableRoom) {
      setSelectedRoomId(firstAvailableRoom.id);

      document
        .getElementById("room-options")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <Header />

      <main className="hostel-details-page">
        <section className="hostel-details-header">
          <div className="container">
            <Link className="back-results-link" to={ROUTES.HOSTELS}>
              ← Back to hostel results
            </Link>

            <div className="hostel-title-row">
              <div>
                <div className="hostel-title-badges">
                  {hostel.verified && (
                    <span className="details-badge verified-details-badge">
                      Verified hostel
                    </span>
                  )}

                  <span className="details-badge type-details-badge">
                    {hostel.hostelTypeLabel}
                  </span>
                </div>

                <h1>{hostel.name}</h1>

                <p className="hostel-address">
                  {hostel.address} · {hostel.distance}
                </p>
              </div>

              <div className="details-rating-card">
                <span className="details-rating-score">
                  {hostel.rating}
                </span>

                <div>
                  <strong>
                    {hostel.rating >= 4.8
                      ? "Excellent"
                      : hostel.rating >= 4.5
                        ? "Very good"
                        : "Good"}
                  </strong>

                  <span>{hostel.reviewCount} reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container hostel-gallery-section">
          <HostelGallery
            images={hostel.gallery}
            hostelName={hostel.name}
          />
        </section>

        <section className="section">
          <div className="container hostel-details-layout">
            <div className="hostel-details-main">
              <section className="detail-section card">
                <div className="detail-section-heading">
                  <span className="section-eyebrow">
                    Property overview
                  </span>

                  <h2>About this hostel</h2>
                </div>

                <p className="hostel-description">
                  {hostel.description}
                </p>

                <div className="quick-information-grid">
                  <div>
                    <span>Location</span>
                    <strong>
                      {hostel.area}, {hostel.city}
                    </strong>
                  </div>

                  <div>
                    <span>Nearby institution</span>
                    <strong>{hostel.nearbyInstitution}</strong>
                  </div>

                  <div>
                    <span>Meals</span>
                    <strong>
                      {hostel.mealIncluded
                        ? "Included"
                        : "Not included"}
                    </strong>
                  </div>

                  <div>
                    <span>Electricity</span>
                    <strong>
                      {hostel.electricityIncluded
                        ? "Included"
                        : "Charged separately"}
                    </strong>
                  </div>
                </div>
              </section>

              <section className="detail-section card">
                <div className="detail-section-heading">
                  <span className="section-eyebrow">
                    Available services
                  </span>

                  <h2>Facilities and amenities</h2>
                </div>

                <ul className="complete-facilities-grid">
                  {hostel.facilities.map((facility) => (
                    <li key={facility}>
                      <span aria-hidden="true">✓</span>
                      {facility}
                    </li>
                  ))}
                </ul>
              </section>

              <div id="room-options">
                <RoomOptions
                  roomOptions={hostel.roomOptions}
                  selectedRoomId={selectedRoomId}
                  onSelectRoom={setSelectedRoomId}
                />
              </div>

              <section className="detail-section card">
                <div className="detail-section-heading">
                  <span className="section-eyebrow">
                    Resident guidelines
                  </span>

                  <h2>Hostel policies</h2>
                </div>

                <ol className="hostel-policy-list">
                  {hostel.policies.map((policy, index) => (
                    <li key={policy}>
                      <span>{index + 1}</span>
                      <p>{policy}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="detail-section card">
                <div className="reviews-heading">
                  <div className="detail-section-heading">
                    <span className="section-eyebrow">
                      Resident feedback
                    </span>

                    <h2>Reviews</h2>
                  </div>

                  <div className="reviews-overall-score">
                    <strong>{hostel.rating}</strong>
                    <span>out of 5</span>
                  </div>
                </div>

                <div className="reviews-list">
                  {hostel.reviews.map((review) => (
                    <article className="review-card" key={review.id}>
                      <div className="review-header">
                        <div className="reviewer-avatar">
                          {review.reviewerName.charAt(0)}
                        </div>

                        <div>
                          <h3>{review.reviewerName}</h3>
                          <span>{review.date}</span>
                        </div>

                        <div
                          className="review-stars"
                          aria-label={`${review.rating} out of 5 stars`}
                        >
                          {"★".repeat(review.rating)}
                          <span>
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </div>
                      </div>

                      <p>{review.comment}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <div className="hostel-details-sidebar">
              <BookingSummary
                hostel={hostel}
                selectedRoom={selectedRoom}
                onSelectFirstRoom={handleSelectFirstRoom}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HostelDetailsPage;