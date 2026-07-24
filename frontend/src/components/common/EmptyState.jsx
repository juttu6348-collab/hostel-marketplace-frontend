function EmptyState({
  icon = "⌂",
  title,
  message,
  actionLabel = "",
  onAction,
  actionLink = "",
}) {
  return (
    <div className="empty-state">
      <div
        className="empty-state-icon"
        aria-hidden="true"
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {actionLabel && onAction && (
        <button
          className="btn btn-primary"
          type="button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}

      {actionLabel && actionLink && (
        <a
          className="btn btn-primary"
          href={actionLink}
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}

export default EmptyState;