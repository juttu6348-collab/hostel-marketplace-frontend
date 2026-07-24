import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext(null);

function createToastId() {
  return `toast-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((toastId) => {
    setToasts((currentToasts) =>
      currentToasts.filter(
        (toast) => toast.id !== toastId,
      ),
    );
  }, []);

  const showToast = useCallback(
    ({
      title,
      message = "",
      type = "success",
      duration = 4000,
    }) => {
      const toastId = createToastId();

      const newToast = {
        id: toastId,
        title,
        message,
        type,
      };

      setToasts((currentToasts) => [
        ...currentToasts,
        newToast,
      ]);

      if (duration > 0) {
        window.setTimeout(() => {
          removeToast(toastId);
        }, duration);
      }

      return toastId;
    },
    [removeToast],
  );

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      removeToast,
    }),
    [toasts, showToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider.",
    );
  }

  return context;
}