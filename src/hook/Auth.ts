import { useEffect, useState } from "react";
import axios from "axios";
import { AuthEndpoints } from "@/enums/APIEnum";

export const useAuth = () => {
  // State
  const [isAuth, setIsAuth] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    axios
      .get(AuthEndpoints.VerifyToken, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        setIsAuth(res.data.success);
        if (!res.data.success) {
          localStorage.removeItem("token");
        }

        if (res.data.success && window.location.pathname === "/") {
          window.location.href = "/dashboard";
        }
        if (!res.data.success && window.location.pathname !== "/") {
          window.location.href = "/";
        }
      });
  }, []);

  // Return isAuth state
  return isAuth;
};
