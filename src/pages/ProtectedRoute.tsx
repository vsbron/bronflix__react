import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { useUser } from "@/redux/reducers/userReducer";
import { auth } from "@/utils/firebase";

import Loader from "@/components/ui/Loader";
import { NAV_LINKS_MAIN } from "@/lib/navLinks";

function ProtectedRoute() {
  // Setting the state for auth checking
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  // Getting the id and loading state from redux
  const { uid, isLoading } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setAuthChecked(true);
    });

    return unsubscribe;
  }, []);

  // Loading state
  if (!authChecked || isLoading) return <Loader />;

  // Guard clause
  if (!uid) return <Navigate to={NAV_LINKS_MAIN.home.path} replace />;

  // Return outlet
  return <Outlet />;
}

export default ProtectedRoute;
