import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import signUpImg from "../../assets/signUp/image.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { app } from '../../auth/firebase';
import { useSignup } from "../../hooks/useSignup";

function SignUp() {
  const location = useLocation();
  const role = location.state?.role;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: role,  // Store the role in formData
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store the OTP generated on the frontend

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { signup, gSignup } = useSignup();

  const auth = getAuth(app);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const response = await gSignup(resultsFromGoogle.user.displayName.split(' ')[0], resultsFromGoogle.user.displayName.split(' ')[1], resultsFromGoogle.user.email, role);
      if (response) alert(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromFacebook = await signInWithPopup(auth, provider);
      const response = await gSignup(resultsFromFacebook.user.displayName.split(' ')[0], resultsFromFacebook.user.displayName.split(' ')[1], resultsFromFacebook.user.email, role);
      if (response) alert(response);
    } catch (error) {
      console.log(error);
    }
  }

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const generatedOtp = generateOtp();
    setGeneratedOtp(generatedOtp);

    try {
      const response = await fetch('http://localhost:4000/api/user/signupOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp: generatedOtp }), // Send email and OTP to the backend
      });

      if (response.ok) {
        setOtpSent(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if (otp === generatedOtp) {
      handleSignUp();
    } else {
      alert("Invalid OTP");
    }
  };

  const handleSignUp = async () => {
    const response = await signup(formData.firstName, formData.lastName, formData.email, formData.password, formData.role);
    if (response) {
      alert(response);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto my-10">
      <div className="min-h-screen px-4 md:px-10 lg:px-28 mx-auto">
        <div className="flex flex-col-reverse md:flex-row lg:flex-row justify-around gap-5">
          <img
            src={signUpImg}
            alt="SignUp Img"
            className="lg:h-screen md:w-96 lg:w-1/2 rounded"
          />

          <div className="w-full lg:w-1/3">
            <p className="text-center mb-2 lg:text-right">
              Have an account?
              <span className="text-primary-color font-medium">
                <Link to="/login"> Sign In!</Link>
              </span>
            </p>
            <p className="font-semibold text-2xl text-center">
              Get Started With TechHub
            </p>
            <h6 className="text-center mb-4">Getting started is easy</h6>
            <div className="flex gap-2 justify-center">
              <button className="btn border-primary-color font-medium" onClick={handleGoogleLogin}>
                <FcGoogle className="text-3xl" />
                Google
              </button>
              <button className="btn border" onClick={handleFacebookLogin}>
                <FaFacebook className="text-3xl text-[#1877F2]" />
                Facebook
              </button>
            </div>
            <div className="divider">Or Continue with</div>
            <div className="mx-auto w-full max-w-sm">
              {!otpSent ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-control">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input input-bordered border-primary-color focus:outline-none"
                      required
                    />
                  </div>
                  <div className="form-control my-4">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input input-bordered border-primary-color focus:outline-none"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered border-primary-color focus:outline-none"
                      required
                    />
                  </div>
                  <div className="form-control my-4">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input input-bordered border-primary-color focus:outline-none"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input input-bordered border-primary-color focus:outline-none"
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn bg-primary-color text-white">
                      Register
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit}>
                  <p className="my-3 text-lg">Please enter the OTP you received on your Mail</p>
                  <div className="form-control">
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={handleOtpChange}
                      className="input input-bordered border-primary-color focus:outline-none"
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn bg-primary-color text-white">
                      Verify OTP
                    </button>
                  </div>
                </form>
              )}
              <p className="mt-2">
                By continuing you indicate that you read and agreed to the Terms
                of Use
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
