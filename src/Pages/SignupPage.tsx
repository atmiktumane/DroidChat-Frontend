import { Button, PasswordInput, TextInput } from "@mantine/core";
import logo from "../assets/droidChat_Logo.png";
import { MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";
import { useState } from "react";
import { signupFormValidation } from "../Utils/FormValidation";
import { Link, useNavigate } from "react-router-dom";
import { signupAPI } from "../Services/UserService";
import { successNotification } from "../Utils/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Components/Loader";
import { setLoading } from "../ReduxStore/Slices/loadingSlice";

export const SignupPage = () => {
  // Initial values of Signup form inputs
  const form = {
    name: "",
    email: "",
    password: "",
  };

  // State to manage : data in input fields
  const [data, setData] = useState<{ [key: string]: string }>(form);

  // State to manage : validation errors in input fields
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);

  // Redux State : To manage loader
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  const dispatch = useDispatch();

  // Navigation
  const navigate = useNavigate();

  // Handle Data function -> save data onChange of input fields
  const onChangeHandleData = (e: any) => {
    // console.log(e);

    // Remaining Input fields
    // const {name, value} = e.target;
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });

    // Validation Error checks
    setFormError({ ...formError, [name]: signupFormValidation(name, value) });

    // console.log(name);
  };

  // Submit Signup Form - Register API call
  const submitSignupForm = async (e: any) => {
    e.preventDefault();

    // Check input validation onSubmit
    let valid = true;

    let newFormError: { [key: string]: string } = {};

    for (let key in data) {
      if (key === "role") continue;

      if (key !== "confirmPassword")
        newFormError[key] = signupFormValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFormError[key] = "Passwords does not match.";

      // if any input field is having validation error, then set valid = false
      if (newFormError[key]) valid = false;
    }

    // Set validation input error
    setFormError(newFormError);

    // Validation failed, Don't proceed further
    if (valid === false) return;

    console.log("User Data : ", data);

    // Show Loader
    dispatch(setLoading(true));

    try {
      await signupAPI(data);

      // console.log("Register success data : ", response);

      // Hide Loader
      dispatch(setLoading(false));

      // Show Success Notification
      successNotification(
        "User Registered Successfully",
        "Navigating to Login Page"
      );

      // Navigate to Login Page
      navigate("/login");
    } catch (error: any) {
      // Hide Loader
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
        {/* Diagonal split background with glow */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main diagonal split */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #ffffff 45%, #67e8f9 45%, #67e8f9 100%)",
            }}
          />

          {/* Glowing diagonal line */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, transparent 44.5%, #22d3ee 44.5%, #22d3ee 45.5%, transparent 45.5%, transparent 100%)",
              filter: "blur(2px)",
              opacity: 0.6,
            }}
          />

          {/* Additional glow effect */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, transparent 43%, rgba(34, 211, 238, 0.2) 45%, transparent 47%, transparent 100%)",
              filter: "blur(20px)",
            }}
          />
        </div>

        {/* Main Content Container */}

        <div className="relative z-10 w-full max-w-6xl flex items-center justify-between gap-8">
          {/* Left side - Login Form */}
          <div className="flex-1 max-w-md">
            <div className="p-8 rounded-xl border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)] bg-white/95 backdrop-blur-sm">
              {/* Logo */}
              <img
                src={logo}
                alt="Logo"
                className="h-14 w-14 place-self-center"
              />

              {/* Heading */}
              <h2 className="text-md font-semibold text-zinc-900 text-center">
                Welcome to{" "}
                <span className="font-semibold bg-gradient-to-r from-blue-500 to-fuchsia-600 bg-clip-text text-transparent">
                  Droid Chat
                </span>
              </h2>

              {/* Sub heading */}
              <h4 className="text-sm mt-1 mb-6 font-medium text-zinc-500 text-center">
                <span className="font-semibold">Sign Up</span> to start chatting
                with your AI assistant
              </h4>

              {/* Signup Form */}
              <div className="space-y-4">
                {/* Name Input */}
                <TextInput
                  withAsterisk
                  name="name"
                  label="Name"
                  placeholder="Your name"
                  value={data.name}
                  onChange={onChangeHandleData}
                  error={formError.name}
                />

                {/* Email Input */}
                <TextInput
                  size="sm"
                  leftSection={<MdOutlineAlternateEmail />}
                  withAsterisk
                  label="Email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={onChangeHandleData}
                  error={formError.email}
                />

                {/* Password Input */}
                <PasswordInput
                  size="sm"
                  withAsterisk
                  leftSection={<MdLockOutline />}
                  label="Password"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={onChangeHandleData}
                  error={formError.password}
                />

                {/* Signup Button */}
                <Button
                  onClick={submitSignupForm}
                  autoContrast
                  variant="filled"
                  color="cyan.3"
                  fullWidth
                  styles={{
                    label: { color: "white" },
                  }}
                >
                  Sign Up
                </Button>

                {/* Login  */}
                <p className="text-center text-xs font-medium text-zinc-500">
                  Already have an account ?{" "}
                  <Link
                    to="/"
                    className="text-sm font-semibold text-cyan-500 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Welcome Message */}
          <div className="flex-1 max-w-md text-gray-800 hidden md:block text-zinc-900">
            <div className="space-y-4">
              <h1 className="text-6xl tracking-tight font-semibold bg-gradient-to-r from-blue-500 to-fuchsia-600 bg-clip-text text-transparent">
                DROID CHAT
              </h1>
              <p className="text-xl text-gray-700">
                Continue your journey with our AI assistant and explore endless
                possibilities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loader */}
      <Loader isLoading={isLoading} />
    </>
  );
};
