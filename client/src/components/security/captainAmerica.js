import { Navigate, Route } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ element, ...rest }) {
  const token = Cookies.get("token");

  return token ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
