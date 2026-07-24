import { useState } from "react";
import formatCurrency from "../../utils/formatCurrency";
import "./OwnerRoomManager.css";

const initialRoomValues = {
  name: "",
  occupancy: "2",
  price: "",
  availableBeds: "",
};

function OwnerRoomManager({
  listing,
  onAddRoom,
  onUpdateRoom,
  onRemoveRoom,
}) {
  const [values, setValues] = useState(initialRoomValues);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !values.name.trim() ||
      Number(values.price) <= 0 ||
      Number(values.availableBeds) < 0
    ) {
      setError(
        "Enter a room name, valid price and available-bed count.",
      );
      return;
    }

    onAddRoom(listing.id, {
      name: values.name.trim(),
      occupancy: Number(values.occupancy),
      price: Number(values.price),
      availableBeds: Number(values.availableBeds),
    });

    setValues(initialRoomValues);
  }

  function changeBedCount(room, change) {
    const nextCount = Math.max(
      0,
      room.availableBeds + change,
    );

    onUpdateRoom(listing.id, room.id, {
      availableBeds: nextCount,
    });
  }

  return (
    <div className="owner-room-manager">
      <div className="owner-room-heading">
        <div>
          <h3>Room inventory</h3>
          <p>
            Add room types and maintain available-bed counts.
          </p>
        </div>
      </div>

      {listing.rooms.length > 0 ? (
        <div className="owner-room-list">
          {listing.rooms.map((room) => (
            <article
              className="owner-room-card"
              key={room.id}
            >
              <div>
                <h4>{room.name}</h4>

                <p>
                  {room.occupancy}{" "}
                  {room.occupancy === 1
                    ? "person"
                    : "people"}{" "}
                  · {formatCurrency(room.price)}/month
                </p>
              </div>

              <div className="room-bed-control">
                <span>Available beds</span>

                <div>
                  <button
                    type="button"
                    aria-label={`Decrease beds for ${room.name}`}
                    onClick={() =>
                      changeBedCount(room, -1)
                    }
                  >
                    −
                  </button>

                  <strong>{room.availableBeds}</strong>

                  <button
                    type="button"
                    aria-label={`Increase beds for ${room.name}`}
                    onClick={() =>
                      changeBedCount(room, 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="remove-room-button"
                type="button"
                onClick={() =>
                  onRemoveRoom(listing.id, room.id)
                }
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="owner-room-empty">
          No room types have been added yet.
        </div>
      )}

      <form
        className="add-room-form"
        onSubmit={handleSubmit}
      >
        <h4>Add room type</h4>

        <div className="add-room-grid">
          <input
            name="name"
            type="text"
            value={values.name}
            placeholder="Two-Seater Room"
            aria-label="Room name"
            onChange={handleChange}
          />

          <select
            name="occupancy"
            value={values.occupancy}
            aria-label="Room occupancy"
            onChange={handleChange}
          >
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
          </select>

          <input
            name="price"
            type="number"
            min="1"
            value={values.price}
            placeholder="Monthly price"
            aria-label="Monthly room price"
            onChange={handleChange}
          />

          <input
            name="availableBeds"
            type="number"
            min="0"
            value={values.availableBeds}
            placeholder="Available beds"
            aria-label="Available beds"
            onChange={handleChange}
          />

          <button
            className="btn btn-primary"
            type="submit"
          >
            Add Room
          </button>
        </div>

        {error && (
          <p className="owner-room-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default OwnerRoomManager;