import "./LoadingSkeleton.css";

function LoadingSkeleton({
  variant = "card",
  count = 1,
}) {
  return (
    <div
      className={`loading-skeleton-list loading-skeleton-${variant}-list`}
      aria-label="Loading content"
      aria-busy="true"
    >
      {Array.from({ length: count }).map(
        (_, index) => (
          <div
            className={`loading-skeleton loading-skeleton-${variant}`}
            key={index}
          >
            {variant === "card" && (
              <>
                <div className="skeleton-block skeleton-image" />

                <div className="skeleton-content">
                  <div className="skeleton-block skeleton-title" />
                  <div className="skeleton-block skeleton-text" />
                  <div className="skeleton-block skeleton-text skeleton-text-short" />
                </div>
              </>
            )}

            {variant === "table" && (
              <>
                <div className="skeleton-block skeleton-table-cell" />
                <div className="skeleton-block skeleton-table-cell" />
                <div className="skeleton-block skeleton-table-cell" />
                <div className="skeleton-block skeleton-table-cell" />
              </>
            )}

            {variant === "details" && (
              <>
                <div className="skeleton-block skeleton-details-image" />

                <div className="skeleton-details-content">
                  <div className="skeleton-block skeleton-title" />
                  <div className="skeleton-block skeleton-text" />
                  <div className="skeleton-block skeleton-text" />
                  <div className="skeleton-block skeleton-button" />
                </div>
              </>
            )}
          </div>
        ),
      )}
    </div>
  );
}

export default LoadingSkeleton;