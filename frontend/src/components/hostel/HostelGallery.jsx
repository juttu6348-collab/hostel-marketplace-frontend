import { useState } from "react";
import "./HostelGallery.css";

function HostelGallery({ images, hostelName }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [failedImages, setFailedImages] = useState([]);

  function handleImageError(imageUrl) {
    setFailedImages((currentImages) => [
      ...new Set([...currentImages, imageUrl]),
    ]);
  }

  const availableImages = images.filter(
    (imageUrl) => !failedImages.includes(imageUrl),
  );

  const activeImage = availableImages.includes(selectedImage)
    ? selectedImage
    : availableImages[0];

  return (
    <section
      className="hostel-gallery"
      aria-label={`${hostelName} image gallery`}
    >
      <div className="gallery-main-image">
        {activeImage ? (
          <img
            src={activeImage}
            alt={`${hostelName} main view`}
            onError={() => handleImageError(activeImage)}
          />
        ) : (
          <div className="gallery-image-fallback">
            Hostel image is unavailable
          </div>
        )}
      </div>

      <div className="gallery-thumbnails">
        {availableImages.map((imageUrl, index) => (
          <button
            className={`gallery-thumbnail ${
              activeImage === imageUrl
                ? "gallery-thumbnail-active"
                : ""
            }`}
            type="button"
            key={imageUrl}
            aria-label={`View image ${index + 1} of ${hostelName}`}
            onClick={() => setSelectedImage(imageUrl)}
          >
            <img
              src={imageUrl}
              alt=""
              onError={() => handleImageError(imageUrl)}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export default HostelGallery;