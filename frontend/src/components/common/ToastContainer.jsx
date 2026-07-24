import { useToast } from "../../context/ToastContext";
import "./ToastContainer.css";

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="toast-container"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <article
  className={`toast-message toast-${toast.type}`}
  key={toast.id}
  role={
    toast.type === "error"
      ? "alert"
      : "status"
  }
>
          <div
            className="toast-status-icon"
            aria-hidden="true"
          >
            {toast.type === "success" && "✓"}
            {toast.type === "error" && "!"}
            {toast.type === "warning" && "!"}
            {toast.type === "info" && "i"}
          </div>

          <div className="toast-content">
            <strong>{toast.title}</strong>

            {toast.message && (
              <p>{toast.message}</p>
            )}
          </div>

          <button
            className="toast-close-button"
            type="button"
            aria-label="Close notification"
            onClick={() => removeToast(toast.id)}
          >
            ×
          </button>
        </article>
      ))}
    </div>
  );
}

export default ToastContainer;