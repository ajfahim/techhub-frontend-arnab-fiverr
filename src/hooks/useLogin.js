import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);

    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/login`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();
    console.log("🚀 ~ login ~ json:", json);

    if (!response.ok) {
      console.log("AOAOAO", json.error);
      return json.error;
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      if (json?.user?.role === "school-owner") {
        navigate("/dashboard");
      } else if (json?.user?.role === "teacher") {
        navigate("/teacherDashboard/profile");
      }
    }
  };
  const gLogin = async (email) => {
    setError(null);

    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/login`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log("AOAOAO", json.error);
      return json.error;
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      if (json?.user?.role === "school-owner") {
        navigate("/dashboard");
      } else if (json?.user?.role === "teacher") {
        navigate("/teacherDashboard/profile");
      }
    }
  };

  return { login, gLogin, error };
};
