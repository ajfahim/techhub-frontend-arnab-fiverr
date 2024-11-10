import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import logo from "../../assets/login/image.png";
import signUpImg from "../../assets/login/image1.png";
import { app } from "../../auth/firebase";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Forgot Password States
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, gLogin } = useLogin();
  const auth = getAuth(app);

  // Generate 6-digit OTP
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      setLoading(true);
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const response = await gLogin(resultsFromGoogle.user.email);
      if (response) {
        alert(response.message);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Facebook Login
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      setLoading(true);
      const resultsFromFacebook = await signInWithPopup(auth, provider);
      const response = await gLogin(resultsFromFacebook.user.email);
      if (response) {
        alert(response.message);
      }
    } catch (error) {
      console.error("Facebook Login Error:", error);
      alert("Facebook login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Regular Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      setLoading(true);
      const response = await login(email, password);
      if (response) {
        alert(response.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password Click
  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  // Handle Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    const otp = generateOtp();
    setGeneratedOtp(otp);
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/forgotPassword/OTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );
      if (response.ok) {
        alert(`OTP has been sent to ${email}`);
        setOtpSent(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      alert("An error occurred while sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      alert("OTP verified successfully.");
      setOtpVerified(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/api/user/changePassword/${email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );
      if (response.ok) {
        alert(
          "Password changed successfully. You can now log in with your new password."
        );
        // Reset all states
        setForgotPassword(false);
        setOtpSent(false);
        setOtp("");
        setGeneratedOtp("");
        setOtpVerified(false);
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || "Failed to change password. Please try again."
        );
      }
    } catch (error) {
      console.error("Change Password Error:", error);
      alert("An error occurred while changing password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto my-10">
      <div className="min-h-screen px-4 md:px-10 lg:px-28 mx-auto">
        <div className="flex flex-col-reverse md:flex-row-reverse lg:flex-row-reverse justify-around gap-5">
          <img
            src={signUpImg}
            alt="SignUp Img"
            className="lg:h-screen md:w-96 lg:w-1/2 rounded pr-4 md:pr-10 lg:pr-28"
          />

          <div className="w-full lg:w-1/3 relative">
            <div className="flex justify-between items-center mb-4">
              <img src={logo} alt="Logo" className="w-32 h-auto" />
              <p className="text-center lg:text-right">
                Don’t have an account?
                <span className="text-primary-color font-medium">
                  <Link to="/roledecide"> Sign Up!</Link>
                </span>
              </p>
            </div>

            <h1 className="text-center mb-2 font-bold text-3xl">
              Welcome Back to TechHub
            </h1>

            <h6 className="text-center mb-4">
              {forgotPassword
                ? "Reset Your Password"
                : "Login into your account"}
            </h6>

            {forgotPassword ? (
              <div className="mx-auto w-full max-w-sm">
                {!otpSent && !otpVerified && (
                  <form onSubmit={handleSendOtp}>
                    <div className="form-control mb-4">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered border-primary-color focus:outline-none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-control mt-6">
                      <button
                        className={`btn bg-primary-color text-white ${
                          loading ? "loading" : ""
                        }`}
                        disabled={loading}
                      >
                        Send OTP
                      </button>
                    </div>
                  </form>
                )}

                {otpSent && !otpVerified && (
                  <form onSubmit={handleVerifyOtp}>
                    <div className="form-control mb-4">
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className="input input-bordered border-primary-color focus:outline-none"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div className="form-control mt-6">
                      <button
                        className={`btn bg-primary-color text-white ${
                          loading ? "loading" : ""
                        }`}
                        disabled={loading}
                      >
                        Verify OTP
                      </button>
                    </div>
                    <p className="text-sm mt-2 text-center">
                      Didn't receive OTP?{" "}
                      <span
                        className="text-primary-color cursor-pointer"
                        onClick={handleSendOtp}
                      >
                        Resend OTP
                      </span>
                    </p>
                  </form>
                )}

                {otpVerified && (
                  <form onSubmit={handleChangePassword}>
                    <div className="form-control mb-4">
                      <input
                        type="password"
                        placeholder="New Password"
                        className="input input-bordered border-primary-color focus:outline-none"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-control mb-4">
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="input input-bordered border-primary-color focus:outline-none"
                        required
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-control mt-6">
                      <button
                        className={`btn bg-primary-color text-white ${
                          loading ? "loading" : ""
                        }`}
                        disabled={loading}
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                )}

                <p
                  className="text-sm mt-4 text-center text-primary-color cursor-pointer"
                  onClick={() => {
                    setForgotPassword(false);
                    setOtpSent(false);
                    setOtpVerified(false);
                    setEmail("");
                    setOtp("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                  }}
                >
                  Back to Login
                </p>
              </div>
            ) : (
              <>
                <div className="flex gap-2 justify-center my-8">
                  <button
                    className="btn border-primary-color font-medium"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <FcGoogle className="text-3xl" />
                        Google
                      </>
                    )}
                  </button>
                  <button
                    className="btn border"
                    onClick={handleFacebookLogin}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <FaFacebook className="text-3xl text-[#1877F2]" />
                        Facebook
                      </>
                    )}
                  </button>
                </div>
                <div className="divider">Or Continue with</div>
                <div className="mx-auto w-full max-w-sm">
                  <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered border-primary-color focus:outline-none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-control mb-4">
                      <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered border-primary-color focus:outline-none"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between mt-2 items-center text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="checkbox" />
                        Remember me
                      </label>
                      <span
                        className="text-[#D93F21] cursor-pointer"
                        onClick={handleForgotPasswordClick}
                      >
                        Forgot Password?
                      </span>
                    </div>

                    <div className="form-control mt-6">
                      <button
                        className={`btn bg-primary-color text-white ${
                          loading ? "loading" : ""
                        }`}
                        disabled={loading}
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
