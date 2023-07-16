import { Navigate, Route, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  // const location = useLocation();
  const appID = Cookies.get("appID");

  if (appID) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
