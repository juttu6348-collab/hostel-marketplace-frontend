import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ROUTES from "../../constants/routes";

function OwnerRoute({ children }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (user.role !== "owner") {
    return <Navigate to={ROUTES.ACCOUNT} replace />;
  }

  return children;
}

export default OwnerRoute;