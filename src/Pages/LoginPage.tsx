import { Button, PasswordInput, TextInput } from "@mantine/core";
import logo from "../assets/droidChat_Logo.png";
import { MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { ForgotPassword } from "../Components/ForgotPassword";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginFormValidation } from "../Utils/FormValidation";
import { successNotification } from "../Utils/NotificationService";
import { loginAPI } from "../Services/UserService";
import { setLocalStorageItem } from "../Utils/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Components/Loader";
import { setLoading } from "../ReduxStore/Slices/loadingSlice";

export const LoginPage = () => {
  // Initial values of Login form inputs
  const form = {
    email: "",
    password: "",
  };

  // State to manage : data in input fields
  const [loginData, setLoginData] = useState<{ [key: string]: string }>(form);

  // State to manage : validation errors in input fields
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);

  // State : To manage loader
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  const dispatch = useDispatch();

  // Mantine ResetPassword Modal (Open/Close)
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  // Handle Data function -> save data onChange of input fields
  const onChangeHandleData = (e: any) => {
    // Input fields
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });

    // Validation Error checks
    setFormError({ ...formError, [name]: loginFormValidation(name, value) });
  };

  // Login Form Submit
  const submitLoginForm = async (e: any) => {
    e.preventDefault();

    // Check input validation onSubmit
    let valid = true;
    let newFormError: { [key: string]: string } = {};

    for (let key in loginData) {
      // console.log(key, " -- ", loginData[key]);
      newFormError[key] = loginFormValidation(key, loginData[key]);

      // if any input field is having validation error, then set valid = false
      if (newFormError[key]) valid = false;
    }

    // Set validation input error
    setFormError(newFormError);

    // Validation failed, Don't proceed further
    if (valid === false) return;

    // Show Loader while API Calling
    dispatch(setLoading(true));

    try {
      const response = await loginAPI(loginData);

      // console.log("Login success data : ", response);

      // Save data in Local Storage
      setLocalStorageItem("user", response);

      // Hide Loader
      dispatch(setLoading(false));

      // Show Success Notification
      successNotification("Success", "Login Successfull");

      // Navigate to Chat Page

      navigate("/chat");
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
                <span className="font-semibold">Login</span> to start chatting
                with your AI assistant
              </h4>

              {/* Login Form */}
              <div className="space-y-4">
                {/* Email Input */}
                <TextInput
                  size="sm"
                  leftSection={<MdOutlineAlternateEmail />}
                  withAsterisk
                  label="Email"
                  placeholder="Enter email"
                  name="email"
                  value={loginData.email}
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
                  value={loginData.password}
                  onChange={onChangeHandleData}
                  error={formError.password}
                />

                {/* Login Button */}
                <Button
                  onClick={submitLoginForm}
                  autoContrast
                  variant="filled"
                  color="cyan.3"
                  fullWidth
                  styles={{
                    label: { color: "white" },
                  }}
                >
                  Login
                </Button>

                {/* Signup  */}
                <p className="text-center text-xs font-medium text-zinc-500">
                  Don't have an account ?{" "}
                  <Link
                    to="/signup"
                    className="text-sm font-semibold text-cyan-500 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>

                {/* Forgot Password */}
                <div className="flex justify-center w-full">
                  <button
                    onClick={open}
                    className="!text-sm !font-semibold text-cyan-500 hover:underline cursor-pointer"
                  >
                    Forgot Password ?
                  </button>
                </div>
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

      {/* Open ResetPassword Modal */}
      <ForgotPassword opened={opened} close={close} />

      {/* Loader */}
      <Loader isLoading={isLoading} />
    </>
  );
};
