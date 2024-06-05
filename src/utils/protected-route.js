import { useEffect } from "react";
import { useUser } from "../context/user";

export const ProtectedRoute = ({ children }) => {
  const { getUserDetails } = useUser();


  if (getUserDetails()) {
    return children;
  } else {
    // navigate("/__catalyst/auth/login", { replace: true });
  }
};
