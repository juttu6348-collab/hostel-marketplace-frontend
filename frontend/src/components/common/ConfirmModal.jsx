import { useEffect, useRef } from "react";
import "./ConfirmModal.css";

function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.setTimeout(() => {
      cancelButtonRef.current?.focus();
    }, 0);

    function handleKeyDown(event) {
      if (event.key === "Escape" && !isLoading) {
        onCancel();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="confirm-modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isLoading
        ) {
          onCancel();
        }
      }}
    >
      <section
        className="confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-message"
        tabIndex="-1"
      >
        <div
          className={`confirm-modal-icon confirm-modal-icon-${variant}`}
          aria-hidden="true"
        >
          {variant === "danger" ? "!" : "?"}
        </div>

        <h2 id="confirm-modal-title">
          {title}
        </h2>

        <p id="confirm-modal-message">
          {message}
        </p>

        <div className="confirm-modal-actions">
          <button
            className="btn btn-secondary"
            type="button"
            ref={cancelButtonRef}
            disabled={isLoading}
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className={`btn ${
              variant === "danger"
                ? "confirm-danger-button"
                : "btn-primary"
            }`}
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading
              ? "Processing..."
              : confirmText}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmModal;