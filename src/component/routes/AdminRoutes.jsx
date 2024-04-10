import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../provider/AuthProvider";

const AdminRoutes = ({children}) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  // console.log("is admin: ", isAdmin);
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading || isAdminLoading)
    return (
      <div className="text-5xl flex justify-center items-center h-[90vh]">Loading</div>
    );
  if (user && isAdmin) return children;
  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;
