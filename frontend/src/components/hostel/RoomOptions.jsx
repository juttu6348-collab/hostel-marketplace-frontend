import formatCurrency from "../../utils/formatCurrency";
import "./RoomOptions.css";

function RoomOptions({
  roomOptions,
  selectedRoomId,
  onSelectRoom,
}) {
  return (
    <section className="detail-section card">
      <div className="detail-section-heading">
        <span className="section-eyebrow">Room availability</span>
        <h2>Choose a room option</h2>
        <p>
          Select the room type you are interested in before making a
          booking request.
        </p>
      </div>

      <div className="room-options-list">
        {roomOptions.map((room) => {
          const isSelected = selectedRoomId === room.id;
          const isUnavailable = room.availableBeds === 0;

          return (
            <article
              className={`room-option ${
                isSelected ? "room-option-selected" : ""
              }`}
              key={room.id}
            >
              <div className="room-option-content">
                <div className="room-option-title-row">
                  <div>
                    <h3>{room.name}</h3>
                    <p>
                      Suitable for {room.occupancy}{" "}
                      {room.occupancy === 1 ? "person" : "people"}
                    </p>
                  </div>

                  <span
                    className={`room-availability ${
                      isUnavailable
                        ? "room-unavailable"
                        : "room-available"
                    }`}
                  >
                    {isUnavailable
                      ? "Currently unavailable"
                      : `${room.availableBeds} beds available`}
                  </span>
                </div>

                <ul className="room-feature-list">
                  {room.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="room-option-action">
                <div className="room-option-price">
                  <strong>{formatCurrency(room.price)}</strong>
                  <span>per month</span>
                </div>

                <button
                  className={`btn ${
                    isSelected
                      ? "btn-secondary"
                      : "btn-primary"
                  }`}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => onSelectRoom(room.id)}
                >
                  {isSelected ? "Selected" : "Select Room"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RoomOptions;